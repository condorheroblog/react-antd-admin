export function rememberRoute() {
	const { pathname, search } = window.location;
	if (pathname.length > 1 && pathname !== "/login") {
		return `?redirect=${pathname}${search}`;
	}
	return "";
}
