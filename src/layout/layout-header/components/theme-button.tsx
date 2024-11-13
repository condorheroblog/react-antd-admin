import { BasicButton } from "#src/components";
import { MoonIcon, SunIcon } from "#src/icons";
import { usePreferencesStore } from "#src/store";

/**
 * 主题切换组件
 * 允许用户通过按钮切换网站的亮色和暗色主题
 *
 * Theme Button Component
 * Allows users to toggle between light and dark themes of the website via a button
 */
export function ThemeButton() {
	const { isLight, changeSiteTheme } = usePreferencesStore();

	return (
		<BasicButton
			type="text"
			size="large"
			className="rounded-none transition-colors"
			icon={isLight ? <MoonIcon /> : <SunIcon />}
			onPointerDown={() => {
				changeSiteTheme(isLight ? "dark" : "light");
			}}
		/>
	);
}
