import { i18n } from "#src/locales";
import { usePreferencesStore } from "#src/store/preferences";
import { isDarkTheme } from "#src/utils";

import { loadingContainerId, loadingId } from './loading'
/**
 * Preview loading page.
 * https://github.com/user-attachments/assets/41074b13-9bfb-4654-b1e4-95aab868e2c9
 */
export function setupLoading2() {
	const isDark = isDarkTheme(usePreferencesStore.getState().theme);
	/**
	 * @see https://github.com/mineadmin/MineAdmin/blob/9e011a75178073aef15d58366920e83879f45fd4/web/index.html#L18-L63
	 * This CSS code from https://github.com/mineadmin/MineAdmin
	 * @author MineAdmin
	*/
	const loading = `
<style>
#${loadingContainerId} {
	position: fixed;
	z-index: 9999;
	background-color: ${isDark ? "#181818" : "transparent"};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
}
.${loadingId}-name__loader {
	line-height: 5em;
	font-weight: bold;
	color: ${isDark ? "#ffffffd9" : "#000000e0"};
	font-size: 20px;
}
.${loadingId}-name__loader::before {
	content: '${import.meta.env.VITE_GLOB_APP_TITLE}';
}
.${loadingId}-animate__loader {
	color: ${usePreferencesStore.getState().themeColorPrimary};
	width: 6px;
	aspect-ratio: 1;
	border-radius: 50%;
	animation:
		animateLoading-1 .75s infinite linear alternate,
		animateLoading-2 1.5s  infinite linear;
}
@keyframes animateLoading-1 {
	0%, 20% {box-shadow:30px 0 0 3px, 10px 0 0 3px, -10px 0 0 3px,-30px 0 0 3px}
	60%, 100% {box-shadow:12px 0 0 3px, 14px 0 0 6px, -14px 0 0 6px,-12px 0 0 3px}
}

@keyframes animateLoading-2 {
	0%, 25% {transform: rotate(0)}
	50%,100% {transform: rotate(.5turn)}
}

.${loadingId}-text__loader {
	font-size: 14px;
	color: #aaa;
	line-height: 7em;
}
.${loadingId}-text__loader::before {
	content: '${i18n.t("common.appLoading")}';
}
</style>
<div class="${loadingId}-name__loader"></div>
<div class="${loadingId}-animate__loader"></div>
<div class="${loadingId}-text__loader"></div>
`;

	const loadingContainerElement = document.getElementById(loadingContainerId);
	if (!loadingContainerElement) {
		const loadingDiv = document.createElement("div");
		loadingDiv.id = loadingContainerId;
		loadingDiv.innerHTML = `<!-- A loading animation displayed before code loads, driven by setupLoading function -->${loading}`;

		const app = document.getElementById("root");

		if (app) {
			app.before(loadingDiv);
		}
	}
}
