# Mock {#mock}

借助 [vite-plugin-fake-server](https://github.com/condorheroblog/vite-plugin-fake-server) 插件的力量，dev 环境可以提供真实和后端交互的 HTTP 请求，打通联调的最后一步，支持常用的 post、get 等请求方法，生产环境通过拦截 XHR 和 Fetch 请求，也能完成数据模拟的任务，**一旦和后端联调完成，建议删除 mock 数据，避免请求优先使用 mock 数据**。

使用 [@faker-js/faker](https://fakerjs.dev/) 可提供常见的数据格式。

## 使用 {#mock-use}

所有的 Mock 数据统一存放在 `src/fake` 目录下，这是一个简单的定义假数据的例子。

::: info fake/user.ts

```ts
import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { ADMIN_TOKEN } from "./constants";
import { resultSuccess } from "./utils";

export default defineFakeRoute([
	{
		url: "/user-info",
		timeout: 1000,
		method: "get",
		response: ({ headers }) => {
			if (headers.authorization?.split?.(" ")?.[1] === ADMIN_TOKEN) {
				return resultSuccess({
					id: 1,
					avatar: "https://avatars.githubusercontent.com/u/47056890",
					username: "Admin",
					email: "<EMAIL>",
					phoneNumber: "1234567890",
					description: "manager",
					roles: ["admin"],
				});
			}
			else {
				return resultSuccess({
					id: 2,
					avatar: "https://avatar.vercel.sh/avatar.svg?text=Common",
					username: "Tom",
					email: "<EMAIL>",
					phoneNumber: "9876543210",
					description: "employee",
					roles: ["common"],
				});
			}
		},
	},
]);
```

:::

## 生产环境关闭数据模拟

在 `vite.config.ts` 中配置 `enableProd: false` 即可关闭生产环境的数据模拟。

::: info vite.config.ts

```ts
import { vitePluginFakeServer } from "vite-plugin-fake-server";

export default defineConfig({
	plugins: [
		react(),
		vitePluginFakeServer({
			basename: "/api",
			enableProd: false, // [!code ++]
			timeout: 1000,
		}),
	],
});
```

:::

## 其他推荐

推荐使用 [MSW（Mock Service Worker）](https://mswjs.io/docs/getting-started) 进行请求拦截，来实现假数据的模拟，MSW 的优点是可以通过拦截请求，在本地实现和后端接口的交互。
