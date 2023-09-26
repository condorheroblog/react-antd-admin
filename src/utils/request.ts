import type { FetchLike } from "wretch";
import { message } from "antd";
import wretch from "wretch";
import { retry } from "wretch/middlewares";
import { store, globalSlice } from "#src/store";

function requestInterceptor(next: FetchLike): FetchLike {
	store.dispatch(globalSlice.actions.openGlobalSpin());
	return next;
}

function responseInterceptor(next: FetchLike): FetchLike {
	return (url, opts) => next(url, { ...opts, headers: { Authorization: `Bearer ${window.localStorage.getItem("token")}`, ...opts.headers } })
		.then(async (response) => {
			if (!response.ok) {
				if (response.status === 401) {
					window.location.href = "/login";
				}

				const json = await response.json();
				message.error(json.message);
				return Promise.reject(response);
			}
			return response;
		})
		.finally(() => {
			store.dispatch(globalSlice.actions.closeGlobalSpin());
		});
}

// wretch.options({ mode: "cors" });
export const request = wretch(import.meta.env.VITE_API_BASE_URL, {})
	.middlewares([requestInterceptor, responseInterceptor, retry({
		until: () => true,
	})])
	.resolve((r) => r.json());
