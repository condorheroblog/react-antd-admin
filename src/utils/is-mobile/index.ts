export function isMobile() {
	const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);

	return device;
}
