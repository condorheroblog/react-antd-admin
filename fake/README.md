## Fake 目录介绍

模拟后端数据，主要用于前端开发调试。

| 文件                   | 说明                   |
|------------------------|------------------------|
| `utils.ts`             | 接口响应工具函数       |
| `auth.fake.ts`         | 权限接口（登录和登出等） |
| `user.fake.ts`         | 用户信息接口           |
| `async-routes.fake.ts` | 动态路由接口           |
| `constants.ts`         | 常量化数据             |
| ...                    | ...                    |

## fake 文件说明

一个经典的 fake 文件如下所示：

> 文件名：`auth.fake.ts`文件名的中间缀(`.fake.`)是必须的。

```ts
import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { resultSuccess } from "./utils";

export default defineFakeRoute([
	{
		url: "/logout",
		timeout: 1000,
		method: "post",
		response: () => resultSuccess({}),
	},
]);
```

## 项目中使用 Fake 的建议

推荐一个页面新建一个 fake 文件即可，文件名与页面同名。
