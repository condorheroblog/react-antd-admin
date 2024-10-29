import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnimationState {
	transitionProgress: boolean
	transitionLoading: boolean
	transitionEnable: boolean
	transitionName: string
}

/**
 * 初始状态
 */
const initialState = {
	transitionProgress: true,
	transitionLoading: true,
	transitionEnable: true,
	transitionName: "fade-slide",
} satisfies AnimationState;

interface AnimationAction {
	reset: () => void
	setAnimation: <T>(key: string, value: T) => void
};

export const useAnimationStore = create<AnimationState & AnimationAction>()(
	persist(
		set => ({
			...initialState,

			/**
			 * 更新动画设置
			 */
			setAnimation: (key, value) => {
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
		{ name: "animation" },
	),

);
