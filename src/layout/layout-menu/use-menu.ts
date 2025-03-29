import type { MenuProps } from "antd";

import { useCurrentRoute } from "#src/hooks";
import { removeTrailingSlash } from "#src/router/utils";
import { useAccessStore } from "#src/store";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { useLayout } from "../hooks";
import { findDeepestFirstItem, findRootMenuByPath, translateMenus } from "./utils";

export function useMenu() {
	const wholeMenus = useAccessStore(state => state.wholeMenus);
	const { isMixedNav, isTwoColumnNav } = useLayout();
	const [rootMenuKey, setRootMenuKey] = useState("");
	const navigate = useNavigate();
	const { t } = useTranslation();
	const translatedMenus = translateMenus(wholeMenus, t);

	const { pathname } = useCurrentRoute();
	/**
	 * 混合菜单模式下需要拆分 menu 的 items
	 */
	const shouldSplitMenuItems = useMemo(
		() => isMixedNav || isTwoColumnNav,
		[isMixedNav, isTwoColumnNav],
	);
	/* 混合菜单模式下需要拆分 menu 的 items */
	const splitSideNavItems = useMemo(
		() => {
			const foundMenu = translatedMenus.find(item => item?.key === rootMenuKey);
			if (!foundMenu) {
				return [];
			}
			return foundMenu?.children ?? [foundMenu];
		},
		[rootMenuKey, translatedMenus],
	);

	/**
	 * 头部菜单
	 */
	const topNavItems = useMemo(() => {
		if (!shouldSplitMenuItems) {
			return translatedMenus;
		}
		return translatedMenus.map((item) => {
			return {
				...item,
				/* children 为空数组，无法触发 menu 的 onSelect 事件 */
				children: undefined,
			};
		});
	}, [shouldSplitMenuItems, translatedMenus]);

	/**
	 * 侧边菜单
	 */
	const sideNavItems = useMemo(() => {
		return shouldSplitMenuItems ? splitSideNavItems : translatedMenus;
	}, [shouldSplitMenuItems, splitSideNavItems, translatedMenus]);

	/**
	 * 菜单点击事件处理
	 */
	const handleMenuSelect = (key: string, mode: MenuProps["mode"]) => {
		if (key === removeTrailingSlash(pathname)) {
			return;
		}
		/* 1. 非混合导航模式 2. 混合导航模式下的侧边导航 */
		if (!shouldSplitMenuItems || mode !== "horizontal") {
			// eslint-disable-next-line regexp/no-unused-capturing-group
			if (/http(s)?:/.test(key)) {
				window.open(key);
			}
			else {
				navigate(key);
			}
		}
		else {
			/* 混合导航模式下的顶部导航 */
			const rootMenu = translatedMenus.find(item => item?.key === key);
			const targetMenu = findDeepestFirstItem(rootMenu?.children ?? []);
			/* 点击顶部的导航默认跳转到菜单下的第一个子项 */
			if (!targetMenu) {
				navigate(key);
			}
			else {
				navigate(targetMenu.key);
			}
		}
	};

	/**
	 * 混合导航模式下，侧边导航的展示
	 */
	useEffect(() => {
		if (shouldSplitMenuItems) {
			const { rootMenuPath } = findRootMenuByPath(translatedMenus, removeTrailingSlash(pathname));
			if (rootMenuPath) {
				setRootMenuKey(rootMenuPath);
			}
		}
	}, [shouldSplitMenuItems, pathname]);

	return {
		handleMenuSelect,
		topNavItems,
		sideNavItems,
	};
}
