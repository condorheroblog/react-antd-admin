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
export function ThemeButton() {
	const { isLight, changeSiteTheme } = usePreferences();

	return (
		<BasicButton
			type="text"
			size="large"
			className="transition-colors rounded-none"
			icon={isLight ? <MoonIcon /> : <SunIcon />}
			onPointerDown={() => {
				changeSiteTheme(isLight ? "dark" : "light");
			}}
		/>
	);
}
