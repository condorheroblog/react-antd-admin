export function rememberRoute() {
	const { pathname, search } = window.location;
	if (pathname || search) {
		return `?redirect=${pathname}${search}`;
	}
	return "";
}
