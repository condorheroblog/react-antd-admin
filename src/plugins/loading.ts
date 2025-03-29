import { usePreferencesStore } from "#src/store/preferences";
import { isDarkTheme } from "#src/utils";

export const loadingId = "loading-e8a3a985";
export const loadingContainerId = "loading-container-e8a3a985";
/**
 * Preview loading page.
 * https://github.com/user-attachments/assets/110701a8-2cf4-4e5f-a07e-b832da4e1586
 */
export function setupLoading() {
	/**
	 * @see https://github.com/pure-admin/vue-pure-admin/blob/cd21f1e050011d8f761094bf8a1e110fb8a33959/index.html#L20-L81
	 * This CSS code from https://github.com/pure-admin/vue-pure-admin
	 * @author pure-admin
	 */
	const loading = `
<style>
#${loadingContainerId} {
	position: fixed;
	inset: 0;
	z-index: 9999999;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	background-color: ${isDarkTheme(usePreferencesStore.getState().theme) ? "#181818" : "transparent"};
	overflow: hidden;
}
#${loadingId},
#${loadingId}::before,
#${loadingId}::after {
	width: 2.5em;
	height: 2.5em;
	border-radius: 50%;
	animation: animation-loader 1.8s infinite ease-in-out;
	animation-fill-mode: both;
}

#${loadingId} {
	position: relative;
	top: 0;
	margin: 80px auto;
	font-size: 10px;
	color: ${usePreferencesStore.getState().themeColorPrimary};
	text-indent: -9999em;
	transform: translateZ(0);
	transform: translate(-50%, 0);
	animation-delay: -0.16s;
}

#${loadingId}::before,
#${loadingId}::after {
	position: absolute;
	top: 0;
	content: "";
}

#${loadingId}::before {
	left: -3.5em;
	animation-delay: -0.32s;
}

#${loadingId}::after {
	left: 3.5em;
}

@keyframes animation-loader {
	0%,
	80%,
	100% {
		box-shadow: 0 2.5em 0 -1.3em;
	}

	40% {
		box-shadow: 0 2.5em 0 0;
	}
}
</style>
<div id="${loadingId}"></div>
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
