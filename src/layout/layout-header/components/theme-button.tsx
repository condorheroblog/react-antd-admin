import type { ButtonProps } from "antd";

import { BasicButton } from "#src/components";
import { usePreferences } from "#src/hooks";
import { MoonIcon, SunIcon } from "#src/icons";

/**
 * 主题切换组件
 * 允许用户通过按钮切换网站的亮色和暗色主题
 *
 * Theme Button Component
 * Allows users to toggle between light and dark themes of the website via a button
 */
export function ThemeButton({ ...restProps }: ButtonProps) {
	const { isLight, changeSiteTheme } = usePreferences();

	return (
		<BasicButton
			type="text"
			{...restProps}
			icon={isLight ? <MoonIcon /> : <SunIcon />}
			onPointerDown={(e) => {
				restProps?.onPointerDown?.(e);
				changeSiteTheme(isLight ? "dark" : "light");
			}}
		/>
	);
}
