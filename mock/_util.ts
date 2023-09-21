import Mock from "mockjs";

export function resultSuccess(result: unknown, { message = "ok" } = {}) {
	return Mock.mock({
		code: 200,
		result,
		message,
		type: "success",
	});
}
