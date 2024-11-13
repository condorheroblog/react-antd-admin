import { create } from "zustand";

/**
 * @zh 应用的初始状态
 * @en Initial state of the application
 */
const initialState = {
	/**
	 * @zh 全局加载动画是否显示
	 * @en Whether the global spinning animation is shown
	 */
	globalSpin: false,
};

type GlobalState = typeof initialState;

interface GlobalAction {
	openGlobalSpin: () => void
	closeGlobalSpin: () => void
};

export const useGlobalStore = create<GlobalState & GlobalAction>(set => ({
	...initialState,

	openGlobalSpin: () => {
		return set({
			globalSpin: true,
		});
	},

	closeGlobalSpin: () => {
		return set({
			globalSpin: false,
		});
	},

}));
