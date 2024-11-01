import { useResponsive } from "ahooks";

/**
 * 判断当前设备类型（移动设备、iPad、PC 等）
 *
 */
export function useDeviceType() {
	// 如果使用 useBreakpoint，注意 useResponsive 和 antd 的 useBreakpoint xs 的表现行为不一致
	/**
	 * useResponsive 默认的断点为：
	 * @see https://ahooks.js.org/hooks/use-responsive
	 * {
	 *   xs: 0,
	 *   sm: 576,
	 *   md: 768,
	 *   lg: 992,
	 *   xl: 1200,
	 * }
	 */
	const responsive = useResponsive();
	const isMobile = (responsive.xs && !responsive.sm) || (responsive.sm && !responsive.md);
	const isIpad = responsive.md && !responsive.xl;
	const isPC = responsive.xl;

	return { isMobile, isIpad, isPC };
}
