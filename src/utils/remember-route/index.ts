export function rememberRoute() {
	const { pathname, search } = window.location;
	if (pathname.length > 1) {
		return `?redirect=${pathname}${search}`;
	}
	return "";
}
