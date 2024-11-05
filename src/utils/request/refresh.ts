import type { KyResponse, Options } from "ky";
import { fetchRefreshToken } from "#src/api/user";

import { useAuthStore } from "#src/store";
import ky from "ky";
import { AUTH_HEADER } from "./constants";
import { goLogin } from "./go-login";

let isRefreshing = false;

/**
 * 刷新token并重新发起请求
 *
 * @param request 请求对象
 * @param options 请求选项
 * @param refreshToken 刷新token
 * @returns 响应对象
 * @throws 刷新 token 失败时抛出异常
 */
export async function refreshTokenAndRetry(request: Request, options: Options, refreshToken: string) {
	if (!isRefreshing) {
		isRefreshing = true;
		try {
			// 调用 fetchRefreshToken 函数，使用传入的 refreshToken 获取新的 token 和 refreshToken
			const freshResponse = await fetchRefreshToken({ refreshToken });
			// 从响应中提取新的 token
			const newToken = freshResponse.result.token;
			// 从响应中提取新的 refreshToken
			const newRefreshToken = freshResponse.result.refreshToken;
			// 将新的 token 和 refreshToken 保存到 userStore 中
			useAuthStore.setState({ token: newToken, refreshToken: newRefreshToken });
			// 调用 onRefreshed 函数，传入新的 token
			onRefreshed(newToken);

			// 设置请求的 Authorization 头部为新的 token
			// 重试当前请求
			request.headers.set(AUTH_HEADER, `Bearer ${newToken}`);
			// 使用新的 token 重新发起请求
			return ky(request, options);
		}
		catch (error) {
			// 调用 onRefreshFailed 函数，传入错误对象
			// refreshToken 认证未通过，拒绝所有等待的请求
			onRefreshFailed(error);
			// 跳转到登录页
			goLogin();
			// 抛出错误
			throw error;
		}
		finally {
			// 无论是否发生错误，都将 isRefreshing 设置为 false
			isRefreshing = false;
		}
	}
	else {
		// 等待 token 刷新完成
		return new Promise<KyResponse>((resolve, reject) => {
			// 添加刷新订阅者
			addRefreshSubscriber({
				// 当 token 刷新成功后，将新的 token 设置到请求的 Authorization 头部，并重新发起请求
				resolve: async (newToken) => {
					request.headers.set(AUTH_HEADER, `Bearer ${newToken}`);
					resolve(ky(request, options));
				},
				// 当 token 刷新失败时，拒绝当前 Promise
				reject,
			});
		});
	}
}

// 定义一个数组，用于存储所有等待 token 刷新的订阅者
// 每个订阅者对象包含 resolve 和 reject 方法，分别用于在 token 刷新成功或失败时调用
let refreshSubscribers: Array<{
	resolve: (token: string) => void // 当 token 刷新成功时调用的函数，传入新的 token
	reject: (error: any) => void // 当 token 刷新失败时调用的函数，传入错误信息
}> = [];

/**
 * 当 token 刷新成功时，通知所有等待的订阅者。
 * 遍历所有订阅者，调用其 resolve 方法，并传入新的 token。
 * 然后清空订阅者列表，准备下一次 token 刷新。
 *
 * @param token 刷新后的令牌字符串
 */
function onRefreshed(token: string) {
	refreshSubscribers.forEach(subscriber => subscriber.resolve(token));
	refreshSubscribers = []; // 清空订阅者列表
}

/**
 * 当 token 刷新失败时，通知所有等待的订阅者。
 * 遍历所有订阅者，调用其 reject 方法，并传入错误信息。
 * 然后清空订阅者列表。
 *
 * @param error 刷新失败时产生的错误信息
 */
function onRefreshFailed(error: any) {
	refreshSubscribers.forEach(subscriber => subscriber.reject(error));
	refreshSubscribers = []; // 清空订阅者列表
}

/**
 * 添加一个新的订阅者到列表中。
 * 订阅者对象应包含 resolve 和 reject 方法。
 *
 * @param subscriber 订阅者对象，包含 resolve 和 reject 方法
 */
function addRefreshSubscriber(subscriber: {
	resolve: (token: string) => void // 当 token 刷新成功时调用的函数
	reject: (error: any) => void // 当 token 刷新失败时调用的函数
}) {
	refreshSubscribers.push(subscriber); // 将新的订阅者添加到列表中
}
