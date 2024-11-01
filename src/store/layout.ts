import type {
	MIXED_NAVIGATION,
	TOP_NAVIGATION,
	TWO_COLUMN_NAVIGATION,
} from "#src/layout/widgets/preferences/blocks/layout/constants";
import {
	SIDE_NAVIGATION,
} from "#src/layout/widgets/preferences/blocks/layout/constants";
import { COLLAPSED_WIDTH } from "#src/styles/antdTheme";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NavigationType = typeof SIDE_NAVIGATION | typeof TOP_NAVIGATION | typeof TWO_COLUMN_NAVIGATION | typeof MIXED_NAVIGATION;

interface LayoutState {
	navigationStyle: NavigationType
	/**
	 * 侧边菜单宽度
	 * @default 210
	 */
	sidebarWidth: number
	/**
	 * 侧边菜单折叠宽度
	 * @default 56
	 */
	sideCollapseWidth: number
}

/**
 * 初始状态
 */
const initialState = {
	navigationStyle: SIDE_NAVIGATION,
	sidebarWidth: 210,
	sideCollapseWidth: COLLAPSED_WIDTH,
} satisfies LayoutState;

interface LayoutAction {
	reset: () => void
	setLayout: <T>(key: string, value: T) => void
};

export const useLayoutStore = create<LayoutState & LayoutAction>()(
	persist(
		set => ({
			...initialState,

			/**
			 * 更新设置
			 */
			setLayout: (key, value) => {
				set(() => {
					return { [key]: value };
				});
			},

			/**
			 * 重置状态
			 */
			reset: () => {
				set(() => {
					return { ...initialState };
				});
			},

		}),
		{ name: "preferences-layout" },
	),

);
