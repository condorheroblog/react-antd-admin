/**
 * Get application namespace with suffix
 * 获取带后缀的应用命名空间
 * @param {string} name - The suffix name to append / 要追加的后缀名称
 * @returns {string} Format: `{namespace}-{version}-{env}-{name}` / 格式: `{命名空间}-{版本}-{环境}-{名称}`
 * @example
 * // For Zustand store
 * const storeKey = getAppNamespace('userStore');
 * // Output: "myapp-1.0.0-prod-userStore"
 */
export function getAppNamespace(name: string): string {
	const env = import.meta.env.PROD ? "prod" : "dev";
	const appVersion = __APP_INFO__.pkg.version;
	const appNamespace = import.meta.env.VITE_APP_NAMESPACE;

	if (!appNamespace) {
		throw new Error("VITE_APP_NAMESPACE is not defined in environment variables / 环境变量中未定义 VITE_APP_NAMESPACE");
	}

	const namespace = `${appNamespace}-${appVersion || "unknown"}-${env}`;
	return `${namespace}-${name}`;
}
