// import type { TabItemProps } from "#src/store";
import type { TabsProps } from "antd";
// import { CacheStatusIcon } from "#src/components";
// import { useCurrentRoute } from "#src/hooks";
// import { usePermissionStore, useTabsStore, useUserStore } from "#src/store";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Tabs, theme } from "antd";
import { clsx } from "clsx";

import { useCallback, useEffect, useMemo, useRef } from "react";
// import { useAliveController } from "react-activation";
import { createUseStyles } from "react-jss";
import { useLocation, useNavigate } from "react-router-dom";
import { DraggableTabBar } from "./components/draggable-tab-bar";
import { TabMaximize } from "./components/tab-maximize";
import { TabOptions } from "./components/tab-options";
import { TabActionKeys, useDropdownMenu } from "./hooks/use-dropdown-menu";

const useStyles = createUseStyles(({ token }) => {
	return {
		tabsContainer: {
			backgroundColor: token.colorBgBase,
			borderTop: "1px solid #e8e8e8",
			borderBottom: "1px solid #e8e8e8",
		},
		tab: {
			"& .ant-tabs-nav-wrap": {
				// overflow: "inherit !important",
			},
			"& .ant-tabs-nav-list": {
				gap: "0.5em",
			},
			"& .ant-tabs-nav::before": {
				// 下 border
				display: "none",
			},
			"& .ant-tabs-nav": {
				"margin": 0,
				"& .ant-tabs-tab": {
					paddingTop: "0.3em !important",
					paddingBottom: "0.3em !important",
					// antd 自带的动画和 DND 动画冲突
					transition: "inherit",
				},
			},
			"& .ant-tabs-ink-bar": {
				backgroundColor: token.colorPrimary,
				visibility: "visible !important",
			},
		},
	};
});

/**
 * BasicTabs 组件
 * 用于渲染和管理应用程序的标签页导航
 */
export default function BasicTabs() {
	const { token } = theme.useToken();
	const classes = useStyles();
	const navigate = useNavigate();
	const location = useLocation();
	// const currentRoute = useCurrentRoute();
	const prevPathRef = useRef(location.pathname);
	// const { getCachingNodes } = useAliveController();

	// const { flatRouteList, hasRequestedWholeMenus } = usePermissionStore();
	const { lng } = useUserStore();
	const { activeKey, isRefresh, setActiveKey, setIsRefresh, openTabs, addTab, insertBeforeTab } = useTabsStore();
	const [items, onClickMenu] = useDropdownMenu();

	// const cacheNodeNames = getCachingNodes().map(item => item.name);
	const tabItems: TabItemProps[] = Array.from(openTabs.values()).map(item => ({
		...item,
		label: (
			<div className="relative flex items-center gap-1">
				<span style={{ color: token.green6 }} className="absolute -left-3.5 scale-75 flex animate-pulse">
					{cacheNodeNames.includes(item.key) ? <CacheStatusIcon /> : null}
				</span>
				{item.label}
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
						icon={<RedoOutlined rotate={270} />}
						size="middle"
						type="text"
						className={clsx("rounded-none hover:!bg-transparent", { "pointer-events-none animate-spin": isRefresh })}
						onClick={() => onClickMenu(TabActionKeys.REFRESH, activeKey)}
					/>
				</p>
				<p className="m-0">
					<TabMaximize />
				</p>
				<p className="m-0">
					<TabOptions activeKey={activeKey} />
				</p>
			</div>
		),
	}), [isRefresh, activeKey, onClickMenu]);

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
		if (!Array.from(openTabs.keys()).includes(import.meta.env.VITE_BASE_HOME_PATH) && hasRequestedWholeMenus) {
			insertBeforeTab(import.meta.env.VITE_BASE_HOME_PATH, {
				key: import.meta.env.VITE_BASE_HOME_PATH,
				label: flatRouteList[import.meta.env.VITE_BASE_HOME_PATH]?.handle?.title,
				closable: false,
				draggable: false,
			});
		}
	}, [openTabs, insertBeforeTab, hasRequestedWholeMenus, flatRouteList]);

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
				className={classes.tab}
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
