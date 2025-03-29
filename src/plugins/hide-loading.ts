import { loadingContainerId } from './loading'
export function hideLoading() {
	const loadingElement = document.querySelector(`#${loadingContainerId}`)
	loadingElement?.setAttribute('style', 'visibility: hidden; opacity: 0; transition: all 0.6s ease-out;')
	loadingElement?.addEventListener(
		'transitionend',
		() => {
			loadingElement.remove();
		},
		{ once: true },
	);
}
