import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 标签栏风格
 * brisk 轻快
 * card 卡片
 * chrome 谷歌
 * plain 朴素
 */
type TabsStyleType = "brisk" | "card" | "chrome" | "plain";

interface PreferencesState {
	tabbarStyleType: TabsStyleType
	tabbarEnable: boolean
	tabbarShowIcon: boolean
	tabbarPersist: boolean
	tabbarDraggable: boolean
	tabbarShowMore: boolean
	tabbarShowMaximize: boolean
}

/**
 * 初始状态
 */
const initialState = {
	// 当前主题
	// theme: defaultTheme as ThemeType,

	// tabbar 相关配置
	tabbarEnable: true,
	tabbarShowIcon: true,
	tabbarPersist: true,
	tabbarDraggable: true,
	tabbarStyleType: "chrome",
	tabbarShowMore: true,
	tabbarShowMaximize: true,
} satisfies PreferencesState;

/**
 * 偏好设置操作接口
 */
interface PreferencesAction {
	reset: () => void
	setPreferences: <T>(key: string, value: T) => void
};

/**
 * 偏好设置状态管理
 */
export const usePreferencesStore = create<PreferencesState & PreferencesAction>()(
	persist(
		set => ({
			...initialState,

			/**
			 * 更新偏好设置
			 */
			setPreferences: (key, value) => {
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
		{ name: "preferences" },
	),

);
