# 数据请求 {#request}

## 介绍 {#introduction}

项目所有的请求均存放于 `src/api` 目录下，且所有的请求都是通过 request 方法发起的，这个方法存放在 `src/utils/request` 中，内部封装了 [Ky](https://github.com/sindresorhus/ky) 库。

一个经典的目录结构如下：

```bash
├── src
│   └── api
│       └── system              # 系统管理
│           └── role            # 角色管理
│               ├── index.ts    # 角色管理接口
│               └── types.ts    # 角色管理接口类型定义
```

## 基础用法 {#basic-usage}

```ts
import type { RoleItemType } from "./types";
import { request } from "#src/utils/request";

export * from "./types";

/* 获取角色列表 */
export function fetchRoleList(data: any) {
	return request.get<ApiListResponse<RoleItemType>>("role-list", { searchParams: data, ignoreLoading: true }).json();
}

/* 新增角色 */
export function fetchAddRoleItem(data: RoleItemType) {
	return request.post<ApiResponse<string>>("role-item", { json: data, ignoreLoading: true }).json();
}

/* 修改角色 */
export function fetchUpdateRoleItem(data: RoleItemType) {
	return request.put<ApiResponse<string>>("role-item", { json: data, ignoreLoading: true }).json();
}

/* 删除角色 */
export function fetchDeleteRoleItem(id: number) {
	return request.delete<ApiResponse<string>>("role-item", { json: id, ignoreLoading: true }).json();
}
```

## 请求配置 {#request-config}

ignoreLoading 默认值为 false 为 true 时，不显示 loading 加载动画，接口将在后台静默请求。

## Tanstack Query

推荐只在获取数据的时候（即通过 GET 请求的接口）使用 [Tanstack Query](https://tanstack.com/query/latest) 进行网络请求。

使用 useEffect 进行网络请求，有几个无法解决的痛点。

1. 当 useEffect 有依赖项时，依赖快速变化，网络请求无法按请求顺序返回，会存在[竞速条件](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) 的问题，老的数据可能覆盖新的数据，已经过时的请求不会自动取消。
2. loading 状态，error 状态，等需要自己手动管理。

强烈建议阅读 [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data/) 这篇文章，了解 [Tanstack Query](https://tanstack.com/query/latest) 的原理以及其必要性。

## 请求白名单 {#request-white-list}

当遇到项目某些请求不需要携带 token 的情况下，可以添加到白名单中，在 `src/utils/request/index.ts` 文件中设置 requestWhiteList 变量的值：

```ts
// 请求白名单, 请求白名单内的接口不需要携带 token
const requestWhiteList = ["/login"];
```

## 刷新 token {#refresh-token}

用户登录之后会返回两个 token，一个用于请求接口验证，一个用于 token 过期无感刷新 token，后端可以通过简单的设置让用户在某一段时间无需再次登录。

代码在 `src/utils/request` 文件夹中的 `refresh.ts` 文件中，请查看 refreshTokenAndRetry 函数的代码。

::: info 暂存请求

refreshTokenAndRetry 函数重新刷新 token 时，会暂存失败的请求, 刷新 token 成功后，重新发送这些暂存的请求。

:::

## 跨域 {#cross-domain}

在 `vite.config.ts`，参考下面代码配置本地跨域代理即可：

```ts
const isDev = process.env.NODE_ENV === "development";
export default defineConfig({
	server: {
		port: 3333,
		// https://vitejs.dev/config/server-options#server-proxy
		proxy: {
			"/api": {
				target: "http://191.255.255.123:8888", // [!code ++]
				changeOrigin: true,
				rewrite: path => isDev ? path.replace(/^\/api/, "") : path,
			},
		},
	},
});
```

## 为什么使用 Ky ？ {#why-use-ky}

包括不限于以下优点：

- 更简单的 API - 比 Fetch 还要节约大约一半的代码
- 将非 2xx 状态代码视为错误
- 包括超时支持
- 重试失败的请求
- 请求拦截器和响应拦截器
- 文件下载进度
- 更好的 TS 支持 `.json()` 解析为 unknown 类型

::: info Ky VS Fetch

![ky-vs-fetch.jpeg](/public/guide/ky-vs-fetch.jpeg)

:::

浏览器原生 Fetch API 无法直接监听文件上传进度；下载进度虽可借助 `response.body` 的 `ReadableStream` 手动实现，但代码繁琐。Ky 内置 `onUploadProgress / onDownloadProgress` 回调，一行配置即可精确追踪上传与下载进度。

::: info

- [onDownloadProgress 下载进度回调函数](https://github.com/sindresorhus/ky?tab=readme-ov-file#ondownloadprogress)
- [onUploadProgress 上传进度回调函数](https://github.com/sindresorhus/ky?tab=readme-ov-file#onuploadprogress)

以 下载进度回调函数 为例，其 API 调用方式简洁明了：

```ts
import ky from "ky";

const response = await ky("https://example.com", {
	onDownloadProgress: (progress, chunk) => {
		// Example output:
		// `0% - 0 of 1271 bytes`
		// `100% - 1271 of 1271 bytes`
		console.log(`${progress.percent * 100}% - ${progress.transferredBytes} of ${progress.totalBytes} bytes`);
	}
});
```

:::

## 为什么不使用 Axios ？ {#why-not-use-axios}

1. [Axios 不支持 HTTP/2 协议](https://github.com/axios/axios/issues/6984)，而 Ky 原生支持。
2. Axios 基于 XMLHttpRequest，包大小约为 [2.19 MB](https://packagephobia.com/result?p=axios)。Ky 基于 fetch，包大小约为 [269 kB](https://packagephobia.com/result?p=ky)，体积更小。

## 其他 Fetch 库 {#other-fetch-libraries}

- ofetch: https://github.com/unjs/ofetch
- Wretch: https://github.com/elbywan/wretch
- Better Fetch: https://better-fetch.vercel.app/docs

## 参考 {#reference}

- [Using fetch? Consider Ky](https://x.com/housecor/status/1815730974694449396)
