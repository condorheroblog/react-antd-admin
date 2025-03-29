import type { TabItemProps } from "#src/store";
import type { TabsProps } from "antd";

import { useCurrentRoute } from "#src/hooks";
import { removeTrailingSlash } from "#src/router/utils";
import { useAccessStore, usePreferencesStore, useTabsStore } from "#src/store";
import { isString } from "#src/utils";

import { RedoOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { clsx } from "clsx";
import { isValidElement, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import { tabbarHeight } from "../constants";
import { DraggableTabBar } from "./components/draggable-tab-bar";
import { TabMaximize } from "./components/tab-maximize";
import { TabOptions } from "./components/tab-options";
import { TabActionKeys, useDropdownMenu } from "./hooks/use-dropdown-menu";
import { useStyles } from "./style";

/**
 * LayoutTabbar 组件
 * 用于渲染和管理应用程序的标签页导航
 */
export default function LayoutTabbar() {
	// const { token } = theme.useToken();
	const classes = useStyles();
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const currentRoute = useCurrentRoute();

	const { tabbarStyleType, tabbarShowMaximize, tabbarShowMore } = usePreferencesStore();
	const { flatRouteList } = useAccessStore();
	const { activeKey, isRefresh, setActiveKey, setIsRefresh, openTabs, addTab, insertBeforeTab } = useTabsStore();
	const [items, onClickMenu] = useDropdownMenu();

	const tabItems: TabItemProps[] = Array.from(openTabs.values()).map(item => ({
		...item,
		label: (
			<div className="relative flex items-center gap-1">
				{isString(item.label) ? t(item.label) : item.label}
			</div>
		),
	}));

	/**
	 * 自动重置刷新状态
	 */
	useEffect(() => {
		if (isRefresh) {
			const timer = setTimeout(() => {
				setIsRefresh(false);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [isRefresh, setIsRefresh]);

	/**
	 * 处理标签页切换
	 * @param {string} key - 被选中的标签页的key
	 */
	const handleChangeTabs = useCallback((key: string) => {
		const historyState = openTabs.get(key)?.historyState || { search: "", hash: "" };
		navigate(key + historyState.search + historyState.hash);
	}, [openTabs]);

	/**
	 * 处理标签页编辑（关闭）
	 * @param {React.MouseEvent | React.KeyboardEvent | string} key - 被编辑的标签页的key
	 * @param {string} action - 编辑动作，这里只处理 "remove"
	 */
	const handleEditTabs = useCallback<Required<TabsProps>["onEdit"]>((key, action) => {
		if (action === "remove") {
			onClickMenu(TabActionKeys.CLOSE, key as string);
		}
	}, [onClickMenu]);

	/**
	 * 自定义渲染标签栏，添加右键菜单功能
	 * @param {object} tabBarProps - 标签栏属性
	 * @param {React.ComponentType} DefaultTabBar - 默认标签栏组件
	 * @returns {JSX.Element} 渲染的标签栏
	 */
	const renderTabBar = useCallback<Required<TabsProps>["renderTabBar"]>((tabBarProps, DefaultTabBar) => {
		return (
			<DraggableTabBar
				DefaultTabBar={DefaultTabBar}
				tabBarProps={tabBarProps}
				items={items}
				tabItems={tabItems}
				onClickMenu={onClickMenu}
			/>
		);
	}, [tabItems, items, onClickMenu]);

	/**
	 * 生成标签栏额外内容
	 */
	const tabBarExtraContent = useMemo(() => ({
		right: (
			<div className="flex items-center" style={{ height: tabbarHeight }}>
				<Button
					icon={(
						<RedoOutlined
							rotate={270}
							className={clsx({ "animate-spin": isRefresh })}
						/>
					)}
					size="middle"
					type="text"
					className={clsx("rounded-none h-full border-l border-l-colorBorderSecondary")}
					onClick={() => onClickMenu(TabActionKeys.REFRESH, activeKey)}
				/>
				{tabbarShowMaximize ? (<TabMaximize className="h-full border-l rounded-none border-l-colorBorderSecondary" />) : null}
				{tabbarShowMore ? (<TabOptions activeKey={activeKey} className="h-full border-l rounded-none border-l-colorBorderSecondary" />) : null}
			</div>
		),
	}), [isRefresh, activeKey, onClickMenu, tabbarShowMore, tabbarShowMaximize]);

	/**
	 * 活动标签页被关闭，自动导航到合适路由
	 *
	 * Warning：除了初次进入系统（例如登录），项目中请统一使用 navigate(import.meta.env.VITE_BASE_HOME_PATH) 替代直接使用 navigate("/")，原因如下：
	 * 1. 直接导航到根路径("/")会导致路由根组件重新渲染
	 * 2. 此组件将无法正确监听到 location 变化
	 * 3. 会造成 activeKey 状态保持为上一个活动标签页（显示异常）
	 * 4. 结果 location.pathname 是新的，activeKey 状态却是上一个活动标签页，导致导航异常。
	 */
	useEffect(() => {
		/**
		 * 以下动作会触发活动标签页被关闭：
		 * 1. 关闭当前标签页
		 * 2. 当使用 关闭左边/右边/其他/所有标签页 功能，激活的标签页被关闭
		 *
		 * 此时 activeKey 是最新的，location.pathname 还未更新，使用 navigate 导航到最新的活动标签页，防止显示异常。
		 *
		 * 初次进入应用，activeKey 值为空，不触发自动导航
		 */
		const historyState = openTabs.get(activeKey)?.historyState || { search: "", hash: "" };
		const activeFullPath = activeKey + historyState.search + historyState.hash;
		const currentFullpath = location.pathname + location.search + location.hash;
		if (activeKey.length > 0 && activeFullPath !== currentFullpath) {
			navigate(activeFullPath);
		}
	}, [activeKey]);

	/**
	 * 用户刷新当前页面，但不是默认 Tab 页面时，需要添加默认 Tab
	 */
	useEffect(() => {
		// 检查默认 Tab 是否缺失
		const isDefaultTabMissing = !Array.from(openTabs.keys()).includes(import.meta.env.VITE_BASE_HOME_PATH);

		if (isDefaultTabMissing) {
			const routeTitle = flatRouteList[import.meta.env.VITE_BASE_HOME_PATH]?.handle?.title;
			insertBeforeTab(import.meta.env.VITE_BASE_HOME_PATH, {
				key: import.meta.env.VITE_BASE_HOME_PATH,
				label: isValidElement(routeTitle) ? routeTitle?.props?.children : routeTitle,
				closable: false,
				draggable: false,
			});
		}
	}, [openTabs, insertBeforeTab, flatRouteList]);

	/**
	 * 监听路由变化，添加标签页和激活标签页
	 */
	useEffect(() => {
		const activePath = location.pathname;
		const normalizedPath = removeTrailingSlash(activePath);
		// tabbarEnable 变量会导致本组件挂载和卸载，normalizedPath 可能与 activeKey 相同，增加判断防止 addTab 重复添加
		if (normalizedPath !== activeKey) {
			setActiveKey(normalizedPath);

			const routeTitle = currentRoute.handle?.title;

			addTab(normalizedPath, {
				key: normalizedPath,
				// 保证 label 为 string 类型，存储到 sessionStorage。
				label: isValidElement(routeTitle) ? routeTitle?.props?.children : routeTitle,
				historyState: { search: location.search, hash: location.hash },
				/* 登录之后跳转的默认路由，不可以关闭和拖拽 */
				closable: normalizedPath !== import.meta.env.VITE_BASE_HOME_PATH,
				draggable: normalizedPath !== import.meta.env.VITE_BASE_HOME_PATH,
			});
		}
	}, [location, currentRoute, setActiveKey, addTab]);

	return (
		<div className={classes.tabsContainer}>
			<Tabs
				className={clsx(
					classes.resetTabs,
					tabbarStyleType === "brisk" ? classes.brisk : "",
					tabbarStyleType === "plain" ? classes.plain : "",
					tabbarStyleType === "chrome" ? classes.chrome : "",
					tabbarStyleType === "card" ? classes.card : "",
				)}
				size="small"
				hideAdd
				animated
				onChange={handleChangeTabs}
				activeKey={removeTrailingSlash(activeKey)}
				type="editable-card"
				onEdit={handleEditTabs}
				items={tabItems}
				renderTabBar={renderTabBar}
				tabBarExtraContent={tabBarExtraContent}
			/>
		</div>
	);
}
