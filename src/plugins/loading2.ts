/**
 * Preview loading page.
 * https://github.com/user-attachments/assets/41074b13-9bfb-4654-b1e4-95aab868e2c9
 */
export function setupLoading2() {
	/**
	 * @see https://github.com/mineadmin/MineAdmin/blob/9e011a75178073aef15d58366920e83879f45fd4/web/index.html#L18-L63
	 * This CSS code from https://github.com/mineadmin/MineAdmin
	 * @author MineAdmin
	 */
	const loading = `
<style>
* {
	margin: 0; padding: 0;
}
html, body, #root {
	height: 100%;
}
.app-loading {
	background: #181818;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.app-name__loader {
	line-height: 5em; font-weight: bold; color: #efefef; font-size: 20px;
}
.app-name__loader::before {
	content: 'React Antd Admin';
}
.app-animate__loader {
	color: #fff;
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

.app-text__loader {
	font-size: 14px; color: #aaa; line-height: 7em;
}
.app-text__loader::before {
	content: '再等等，拼命载入资源中'
}
</style>
<div class="app-loading">
	<div class="app-name__loader"></div>
	<div class="app-animate__loader"></div>
	<div class="app-text__loader"></div>
</div>`;

	const app = document.getElementById("root");

	if (app) {
		app.innerHTML = loading;
	}
}
