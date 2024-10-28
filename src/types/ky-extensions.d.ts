import "ky";

/**
 * 扩展 `ky` 的 `Options` 类型
 * 使用 `ignoreLoading` 设置是否忽略加载动画
 */
declare module "ky" {
	interface Options {
		/**
		 * 设置忽略全局加载动画
		 */
		ignoreLoading?: boolean
	}
	interface NormalizedOptions {
		/**
		 * 设置忽略全局加载动画
		 */
		ignoreLoading?: boolean
	}
}
