import { usePreferencesStore } from "#src/store/preferences";

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
#root {
	position: fixed;
	inset: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
}
.loader,
.loader::before,
.loader::after {
	width: 2.5em;
	height: 2.5em;
	border-radius: 50%;
	animation: animation-loader 1.8s infinite ease-in-out;
	animation-fill-mode: both;
}

.loader {
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

.loader::before,
.loader::after {
	position: absolute;
	top: 0;
	content: "";
}

.loader::before {
	left: -3.5em;
	animation-delay: -0.32s;
}

.loader::after {
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
<div class="loader"></div>`;

	const app = document.getElementById("root");

	if (app) {
		app.innerHTML = loading;
	}
}
