import { isObject, message } from "#src/utils";

/**
 * 处理错误响应
 *
 * @param response 响应对象
 * @returns 响应对象
 */
export async function handleErrorResponse(response: Response) {
	try {
		// 将响应内容解析为 JSON 格式
		const data = await response.json();

		// 判断解析后的数据是否为对象类型
		if (isObject(data)) {
			// 将解析后的数据转换为包含错误信息的对象类型
			const json = data as { errorMsg?: string, message?: string };

			// 如果解析后的数据中包含 errorMsg 或 message 属性，则显示错误信息
			// 否则显示响应的状态文本作为错误信息
			message.error(json.errorMsg || json.message || response.statusText);
		}
		else {
			// 如果解析后的数据不是对象类型，则直接显示响应的状态文本作为错误信息
			message.error(response.statusText);
		}
	}
	catch (e) {
		// 如果解析 JSON 格式出错，则打印错误信息到控制台
		console.error("Error parsing JSON:", e);

		// 显示响应的状态文本作为错误信息
		message.error(response.statusText);
	}

	// 返回响应对象
	return response;
}
