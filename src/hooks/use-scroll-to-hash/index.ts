import { useEffect } from "react";

interface ScrollToHashOptions {
	behavior?: ScrollBehavior
	interval?: number
}

/**
 * Scrolls the page to the element with the specified hash in the URL.
 *
 * @param {unknown} trigger - Optional trigger value. When the trigger value changes, the scrolling will be triggered.
 * @param {ScrollToHashOptions} options - Optional options object.
 * @param {string} options.behavior - The scroll behavior. Possible values are "auto", "smooth", or "instant". Default is "smooth".
 * @param {number} options.interval - The interval (in milliseconds) between consecutive scroll actions when scrolling is triggered. Default is 200ms.
 */
export function useScrollToHash(
	trigger?: unknown,
	{ behavior = "smooth", interval = 200 }: ScrollToHashOptions = {},
) {
	useEffect(() => {
		const { hash } = window.location;
		const id = decodeURIComponent(hash.slice(1));

		const scrollToHash = () => {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({
					behavior,
				});
			}
		};

		const delayScroll = setTimeout(scrollToHash, interval);

		return () => clearTimeout(delayScroll);
	}, [trigger]);
}
