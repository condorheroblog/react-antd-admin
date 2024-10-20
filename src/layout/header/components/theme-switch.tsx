import { useGlobalStore } from "#src/store";

import { Switch } from "antd";

/**
 * 主题切换组件
 * 允许用户通过开关切换网站的亮色和暗色主题
 *
 * Theme Switch Component
 * Allows users to toggle between light and dark themes of the website via a switch
 */
export function ThemeSwitch() {
	const { isLight, changeSiteTheme } = useGlobalStore();

	return (
		<Switch
			checked={isLight}
			onChange={(checked) => {
				changeSiteTheme({
					theme: !checked ? "dark" : "light",
					isWriteLocalStorage: true,
				});
			}}
			checkedChildren={(
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480z"
						fill="currentColor"
					/>
				</svg>
			)}
			unCheckedChildren={(
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path d="M234 26h44v92h-44z" fill="currentColor" />
					<path d="M234 394h44v92h-44z" fill="currentColor" />
					<path
						d="M338.025 142.857l65.054-65.054l31.113 31.113l-65.054 65.054z"
						fill="currentColor"
					/>
					<path
						d="M77.815 403.074l65.054-65.054l31.113 31.113l-65.054 65.054z"
						fill="currentColor"
					/>
					<path d="M394 234h92v44h-92z" fill="currentColor" />
					<path d="M26 234h92v44H26z" fill="currentColor" />
					<path
						d="M338.029 369.14l31.112-31.113l65.054 65.054l-31.112 31.112z"
						fill="currentColor"
					/>
					<path
						d="M77.802 108.92l31.113-31.113l65.054 65.054l-31.113 31.112z"
						fill="currentColor"
					/>
					<path
						d="M256 358a102 102 0 1 1 102-102a102.12 102.12 0 0 1-102 102z"
						fill="currentColor"
					/>
				</svg>
			)}
		/>
	);
}
