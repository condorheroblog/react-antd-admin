import type { ButtonProps } from "antd";

import { BasicButton } from "#src/components";
import { usePreferences } from "#src/hooks";
import { MoonIcon, SunIcon } from "#src/icons";
import { useEffect } from "react";
import { flushSync } from "react-dom";

const isBrowser = typeof window !== "undefined";
function injectViewTransitionStyles() {
	if (isBrowser) {
		const styleId = "theme-switch-view-transition-styles";
		if (!document.getElementById(styleId)) {
			const style = document.createElement("style");
			style.id = styleId;
			style.textContent = `
        html.stop-transition * {
          transition: none !important;
        }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-old(root),
        .dark::view-transition-new(root) {
          z-index: 999999999;
        }
        ::view-transition-new(root),
        .dark::view-transition-old(root) {
          z-index: 1;
        }
      `;

			document.head.appendChild(style);
		}
	}
}

/**
 * @zh 主题切换组件
 * 允许用户通过按钮切换网站的亮色和暗色主题
 *
 * @en Theme Button Component
 * Allows users to toggle between light and dark themes of the website via a button
 */
export function ThemeButton({ ...restProps }: ButtonProps) {
	const { isDark, changeSiteTheme } = usePreferences();

	useEffect(() => {
		injectViewTransitionStyles();
	}, []);

	function toggleTheme(event: React.PointerEvent<HTMLElement>) {
		const isAppearanceTransition = !!document.startViewTransition
			&& !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!isAppearanceTransition || !event) {
			changeSiteTheme(isDark ? "light" : "dark");
			return;
		}
		const x = event.clientX;
		const y = event.clientY;
		const endRadius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y),
		);
		const transition = document.startViewTransition(() => {
			// eslint-disable-next-line react-dom/no-flush-sync
			flushSync(() => {
				changeSiteTheme(isDark ? "light" : "dark");
			});
		});
		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`,
			];
			document.documentElement.animate(
				{
					clipPath: isDark ? [...clipPath].reverse() : clipPath,
				},
				{
					duration: 500,
					easing: "ease-in",
					pseudoElement: isDark
						? "::view-transition-old(root)"
						: "::view-transition-new(root)",
				},
			);
		});
	}

	return (
		<BasicButton
			type="text"
			{...restProps}
			icon={isDark ? <SunIcon /> : <MoonIcon />}
			onPointerDown={(e) => {
				restProps?.onPointerDown?.(e);
				toggleTheme(e);
			}}
		/>
	);
}
