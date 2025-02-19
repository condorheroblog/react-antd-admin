import { loginPath } from "#src/router/extra-info";

export function rememberRoute() {
	const { pathname, search } = window.location;
	if (pathname.length > 1 && pathname !== loginPath) {
		return `?redirect=${pathname}${search}`;
	}
	return "";
}
