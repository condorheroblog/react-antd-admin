import { useGlobalStore } from "#src/store";

// 定义一个全局变量用于追踪当前有多少请求正在进行中
let requestCount = 0;

export const globalProgress = {
	/**
	 * 启动请求
	 *
	 * 如果请求计数为 0，则显示全局加载动画，并将请求计数加 1。
	 */
	start() {
		if (requestCount === 0) {
			// 显示全局加载动画
			useGlobalStore.getState().openGlobalSpin();
		}
		// 请求计数加 1
		requestCount++;
	},

	/**
	 * 请求完成后的回调函数
	 *
	 * @description 将请求计数减 1，并保证请求计数不会小于 0；
	 *              如果请求计数为 0，则隐藏全局加载动画
	 */
	done() {
		// 请求计数减 1，但保证请求计数不会小于 0
		requestCount = Math.max(requestCount - 1, 0);
		if (requestCount === 0) {
			// 隐藏全局加载动画
			useGlobalStore.getState().closeGlobalSpin();
		}
	},

	/**
	 * 强制完成请求
	 *
	 * 将请求计数直接设置为0，并隐藏全局加载动画
	 */
	forceFinish() {
		// 直接将请求计数设置为 0
		requestCount = 0;
		// 隐藏全局加载动画
		useGlobalStore.getState().closeGlobalSpin();
	},
};
