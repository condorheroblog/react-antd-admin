import type { MenuProps } from "antd";
import { useTabsStore } from "#src/store";
import {
	CloseOutlined,
	RedoOutlined,
	SwapOutlined,
	VerticalAlignBottomOutlined,
	VerticalAlignMiddleOutlined,
	VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { useCallback, useMemo } from "react";
// import { useAliveController } from "react-activation";

import { useTranslation } from "react-i18next";

const homePath = import.meta.env.VITE_BASE_HOME_PATH;
/**
 * 标签页操作的键值对象
 * @readonly
 * @enum {string}
 * @property {string} REFRESH - 重新加载当前标签页
 * @property {string} CLOSE - 关闭当前标签页
 * @property {string} CLOSE_RIGHT - 关闭右侧标签页
 * @property {string} CLOSE_LEFT - 关闭左侧标签页
 * @property {string} CLOSE_OTHERS - 关闭其他标签页
 * @property {string} CLOSE_ALL - 关闭所有标签页
 */
export const TabActionKeys = {
	REFRESH: "refresh",
	CLOSE: "close",
	CLOSE_RIGHT: "closeRight",
	CLOSE_LEFT: "closeLeft",
	CLOSE_OTHERS: "closeOthers",
	CLOSE_ALL: "closeAll",
} as const;

export type TabActionKey = typeof TabActionKeys[keyof typeof TabActionKeys];

/**
 * 自定义钩子，用于处理标签页的下拉菜单
 * @returns {[Function, Function]} 返回一个元组，包含菜单项生成函数和菜单点击处理函数
 */
export function useDropdownMenu() {
	const { t } = useTranslation();
	const {
		openTabs,
		activeKey,
		removeTab,
		closeLeftTabs,
		closeRightTabs,
		closeOtherTabs,
		closeAllTabs,
		setIsRefresh,
	} = useTabsStore();
	// const { refresh, drop, getCachingNodes } = useAliveController();
	/**
	 * 生成菜单项
	 * @param {string} tabKey - 当前标签页的键
	 * @returns {MenuProps["items"]} 菜单项配置
	 */
	const items = useCallback((tabKey: string): MenuProps["items"] => {
		const isOnlyTab = openTabs.size === 2 && openTabs.has(homePath);
		const isLastTab = Array.from(openTabs.keys()).pop() === tabKey;
		return [
			{
				key: TabActionKeys.REFRESH,
				icon: <RedoOutlined rotate={270} />,
				label: t("common.tabs.refresh"),
				disabled: activeKey !== tabKey,
			},
			{
				key: TabActionKeys.CLOSE,
				icon: <CloseOutlined />,
				label: t("common.tabs.close"),
				disabled: tabKey === homePath,
			},
			{ type: "divider" },
			{
				key: TabActionKeys.CLOSE_LEFT,
				icon: <VerticalAlignBottomOutlined rotate={90} />,
				label: t("common.tabs.closeLeft"),
				disabled: tabKey === homePath || isOnlyTab,
			},
			{
				key: TabActionKeys.CLOSE_RIGHT,
				icon: <VerticalAlignTopOutlined rotate={90} />,
				label: t("common.tabs.closeRight"),
				disabled: tabKey === homePath || isOnlyTab || isLastTab,
			},
			{ type: "divider" },
			{
				key: TabActionKeys.CLOSE_OTHERS,
				icon: <VerticalAlignMiddleOutlined rotate={90} />,
				label: t("common.tabs.closeOthers"),
				disabled: tabKey === homePath || isOnlyTab,
			},
			{
				key: TabActionKeys.CLOSE_ALL,
				icon: <SwapOutlined />,
				label: t("common.tabs.closeAll"),
				disabled: tabKey === homePath,
			},
		];
	}, [t, activeKey, homePath, openTabs]);

	/**
	 * 定义菜单操作与对应的处理函数
	 */
	const actions = useMemo(() => ({
		[TabActionKeys.REFRESH]: () => {
			// 刷新 KeepAlive 缓存的页面
			// refresh(currentPath);
			// 重新渲染页面
			setIsRefresh(true);
		},
		[TabActionKeys.CLOSE]: removeTab,
		[TabActionKeys.CLOSE_RIGHT]: closeRightTabs,
		[TabActionKeys.CLOSE_LEFT]: closeLeftTabs,
		[TabActionKeys.CLOSE_OTHERS]: closeOtherTabs,
		[TabActionKeys.CLOSE_ALL]: closeAllTabs,
	}), [removeTab, closeRightTabs, closeLeftTabs, closeOtherTabs, closeAllTabs]);

	/**
	 * 处理菜单点击事件
	 * @param {string} menuKey - 被点击的菜单项键
	 * @param {string} nodeKey - 当前标签页的键
	 */
	const onClickMenu = useCallback((menuKey: string, nodeKey: string) => {
		const action = actions[menuKey as keyof typeof actions];
		if (action) {
			action(nodeKey);
		}
	}, [actions]);

	/**
	 * 监听标签页变化，如果当前标签页不在缓存中，则清除这个标签页的缓存
	 */
	// useEffect(() => {
	// 	const cacheNodes = getCachingNodes();
	// 	cacheNodes.forEach((node) => {
	// 		if (!openTabs.has(node.name!)) {
	// 			drop(node.name!);
	// 		}
	// 	});
	// }, [openTabs, getCachingNodes, drop]);

	return [items, onClickMenu] as const;
}
