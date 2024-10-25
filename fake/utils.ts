export function resultSuccess(result: unknown, { message = "ok" } = {}) {
	return {
		code: 200,
		result,
		message,
		success: true,
	};
}
