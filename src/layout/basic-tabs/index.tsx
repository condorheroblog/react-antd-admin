import type { TabItemProps } from "#src/store";
import type { TabsProps } from "antd";
import { useCallback, useEffect, useMemo, useRef } from "react";
// import { CacheStatusIcon } from "#src/components";
import { useCurrentRoute } from "#src/hooks";
import { usePermissionStore, usePreferencesStore, useTabsStore, useUserStore } from "#src/store";
import { isString } from "#src/utils";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Tabs, theme } from "antd";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
// import { useKeepAliveContext } from "keepalive-for-react";

import { useLocation, useNavigate } from "react-router-dom";
import { DraggableTabBar } from "./components/draggable-tab-bar";
import { TabMaximize } from "./components/tab-maximize";
import { TabOptions } from "./components/tab-options";
import { TabActionKeys, useDropdownMenu } from "./hooks/use-dropdown-menu";
import { useStyles } from "./style";

/**
 * BasicTabs 组件
 * 用于渲染和管理应用程序的标签页导航
 */
export default function BasicTabs() {
	const { token } = theme.useToken();
	const classes = useStyles();
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const currentRoute = useCurrentRoute();
	const prevPathRef = useRef(location.pathname);
	// const { getCachingNodes } = useKeepAliveContext();

	const { tabbarStyleType, tabbarShowMaximize, tabbarShowMore } = usePreferencesStore();
	const { flatRouteList, hasFetchedDynamicRoutes } = usePermissionStore();
	const { lng } = useUserStore();
	const { activeKey, isRefresh, setActiveKey, setIsRefresh, openTabs, addTab, insertBeforeTab } = useTabsStore();
	const [items, onClickMenu] = useDropdownMenu();

	// const cacheNodeNames = getCachingNodes().map(item => item.name);
	const tabItems: TabItemProps[] = Array.from(openTabs.values()).map(item => ({
		...item,
		label: (
			<div className="relative flex items-center gap-1">
				<span style={{ color: token.green6 }} className="absolute -left-3.5 scale-75 flex animate-pulse">
					{/* {cacheNodeNames.includes(item.key) ? "⭐️" : null} */}
				</span>
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
	}, [navigate, openTabs]);

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
			<div className="flex divide-x">
				<p className="m-0 border-l">
					<Button
						icon={(
							<RedoOutlined
								rotate={270}
								className={clsx({ "animate-spin": isRefresh })}
							/>
						)}
						size="middle"
						type="text"
						className={clsx("rounded-none")}
						onClick={() => onClickMenu(TabActionKeys.REFRESH, activeKey)}
					/>
				</p>
				{tabbarShowMaximize
					? (
						<p className="m-0">
							<TabMaximize />
						</p>
					)
					: null}
				{tabbarShowMore
					? (
						<p className="m-0">
							<TabOptions activeKey={activeKey} />
						</p>
					)
					: null}
			</div>
		),
	}), [isRefresh, activeKey, onClickMenu, tabbarShowMore, tabbarShowMaximize]);

	/**
	 * 监听活动标签页变化，进行导航
	 */
	useEffect(() => {
		/**
		 * 此 hook 只有在改变 tab 导致的 activeKey 变化时才会触发，比如：
		 * 1. 关闭当前标签页
		 * 2. 关闭左边/右边/其他/所有标签页功能，激活的标签页被关闭
		 *
		 * activeKey 有可能为空所以判断 length > 0
		 * 使用 useRef(prevPathRef) 是为了避免路由变化重复导航，代码进入死循环
		 *
		 * 注意：navigate 函数会触发路由变化，不要添加到依赖中
		 */
		if (activeKey.length > 0 && activeKey !== prevPathRef.current) {
			navigate(activeKey);
		}
	}, [activeKey]);

	/**
	 * 用户刷新当前页面，但不是默认 Tab 页面时，需要添加默认 Tab
	 */
	useEffect(() => {
		if (!Array.from(openTabs.keys()).includes(import.meta.env.VITE_BASE_HOME_PATH) && hasFetchedDynamicRoutes) {
			insertBeforeTab(import.meta.env.VITE_BASE_HOME_PATH, {
				key: import.meta.env.VITE_BASE_HOME_PATH,
				label: flatRouteList[import.meta.env.VITE_BASE_HOME_PATH]?.handle?.title,
				closable: false,
				draggable: false,
			});
		}
	}, [openTabs, insertBeforeTab, hasFetchedDynamicRoutes, flatRouteList]);

	/**
	 * 监听路由变化，添加标签页和激活标签页
	 */
	useEffect(() => {
		const activePath = location.pathname;
		const normalizedPath = activePath.length > 0 && activePath.endsWith("/") ? activePath.slice(0, -1) : activePath;

		setActiveKey(normalizedPath);

		addTab(normalizedPath, {
			key: normalizedPath,
			label: currentRoute.handle.title,
			historyState: { search: location.search, hash: location.hash },
			/* 登录之后跳转的默认路由，不可以关闭和拖拽 */
			closable: normalizedPath !== import.meta.env.VITE_BASE_HOME_PATH,
			draggable: normalizedPath !== import.meta.env.VITE_BASE_HOME_PATH,
		});

		prevPathRef.current = normalizedPath;
	}, [location, currentRoute, setActiveKey, addTab]);

	return (
		<div className={classes.tabsContainer}>
			<Tabs
				key={lng}
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
				activeKey={activeKey.endsWith("/") ? activeKey.slice(0, -1) : activeKey}
				type="editable-card"
				onEdit={handleEditTabs}
				items={tabItems}
				renderTabBar={renderTabBar}
				tabBarExtraContent={tabBarExtraContent}
			/>
		</div>
	);
}
