import { useDeviceType } from "#src/hooks";
import {
	MIXED_NAVIGATION,
	SIDE_NAVIGATION,
	TOP_NAVIGATION,
	TWO_COLUMN_NAVIGATION,
} from "#src/layout/widgets/preferences/blocks/layout/constants";
import { usePreferencesStore } from "#src/store";

import { useMemo } from "react";

/**
 * 获取当前页面的布局类型信息
 *
 * @returns 返回包含当前布局类型信息的对象，包含：
 * - currentLayout: 当前导航类型
 * - isSideNav: 是否为侧边导航
 * - isTopNav: 是否为顶部导航
 * - isMixedNav: 是否为混合导航
 * - isTwoColumnNav: 是否为双列导航
 */
export function useLayout() {
	const { isMobile } = useDeviceType();
	// LayoutType
	const navigationStyle = usePreferencesStore(state => state.navigationStyle);
	const sidebarWidth = usePreferencesStore(state => state.sidebarWidth);
	const sideCollapsedWidth = usePreferencesStore(state => state.sideCollapsedWidth);
	const firstColumnWidthInTwoColumnNavigation = usePreferencesStore(state => state.firstColumnWidthInTwoColumnNavigation);

	/**
	 * 当前导航类型
	 */
	const currentLayout = useMemo(
		() => isMobile ? SIDE_NAVIGATION : navigationStyle,
		[isMobile, navigationStyle],
	);

	/**
	 * 是否为侧边导航
	 */
	const isSideNav = useMemo(
		() => currentLayout === SIDE_NAVIGATION,
		[currentLayout],
	);

	/**
	 * 是否为顶部导航
	 */
	const isTopNav = useMemo(
		() => currentLayout === TOP_NAVIGATION,
		[currentLayout],
	);

	/**
	 * 是否为双列导航
	 */
	const isTwoColumnNav = useMemo(
		() => currentLayout === TWO_COLUMN_NAVIGATION,
		[currentLayout],
	);

	/**
	 * 是否为混合导航
	 */
	const isMixedNav = useMemo(
		() => currentLayout === MIXED_NAVIGATION,
		[currentLayout],
	);

	return {
		currentLayout,
		isSideNav,
		isTopNav,
		isMixedNav,
		isTwoColumnNav,
		sidebarWidth,
		sideCollapsedWidth,
		firstColumnWidthInTwoColumnNavigation,
	};
}
