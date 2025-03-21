import type { ReactRouterType, RouterSubscriber } from "#src/router/types";
import type { BlockerFunction } from "react-router";

import { usePreferencesStore } from "#src/store";
import { NProgress } from "#src/utils";
/**
 * 路由前置守卫，用于在路由跳转前执行一些操作
 *
 * 触发条件：使用 react-router 中的 navigate、Link 等方法跳转路由时触发
 *
 * @returns 返回 true 则取消当前导航，返回 false 则继续导航，不支持异步操作
 */
export const routerBeforeEach: (loadedPaths: Set<string>, reactRouter: ReactRouterType) => BlockerFunction = loadedPaths => ({ nextLocation }) => {
	const { transitionProgress } = usePreferencesStore.getState();
	const isLoaded = loadedPaths.has(nextLocation.pathname);
	/* 开启进度条动画 */
	if (transitionProgress && !isLoaded) {
		NProgress.start();
	}

	// 继续导航
	return false;
};

/**
 * 路由后置守卫，在路由跳转完成后执行
 */
export const routerAfterEach: (loadedPaths: Set<string>, reactRouter: ReactRouterType) => RouterSubscriber = loadedPaths => (routerState) => {
	const { transitionProgress } = usePreferencesStore.getState();
	if (routerState.navigation.state === "idle") {
		/* 路由变化，更新文档标题的逻辑放到根布局组件中（src/layout/layout-root/index.tsx） */
		/* 关闭进度条动画 */
		if (transitionProgress) {
			const isLoaded = loadedPaths.has(routerState.location.pathname);
			if (!isLoaded) {
				loadedPaths.add(routerState.location.pathname);
			}
			NProgress.done();
		}
	}
};

/**
 * 路由初始化完成后执行（只会执行一次）
 *
 * 为什么需要 routerInitReady ？
 * [应用初次加载/刷新浏览器/浏览器输入地址回车]并不会触发 routerBeforeEach 钩子，所以需要 routerInitReady 模仿一次 routerBeforeEach。
 */
export async function routerInitReady(loadedPaths: Set<string>, reactRouter: ReactRouterType) {
	/* 顶部进度条 */
	const { transitionProgress } = usePreferencesStore.getState();
	// 是否开启进度条动画
	if (transitionProgress) {
		const { pathname } = reactRouter.state.location;
		const isLoaded = loadedPaths.has(pathname);
		if (!isLoaded) {
			NProgress.start();
		}
		function handleDomReady() {
			loadedPaths.add(pathname);
			NProgress.done();
			document.removeEventListener("DOMContentLoaded", handleDomReady);
		}
		document.addEventListener("DOMContentLoaded", handleDomReady);
	}
}

export function setupCommonGuard(router: ReactRouterType) {
	// 记录已经加载的页面
	const loadedPaths = new Set<string>();
	routerInitReady(loadedPaths, router);
	// router beforeEach
	router.getBlocker("beforeEach", routerBeforeEach(loadedPaths, router));
	// router afterEach
	router.subscribe(routerAfterEach(loadedPaths, router));
}
