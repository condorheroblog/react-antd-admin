## api 目录介绍

> api 目录存放所有请求接口文件，按照页面划分目录，一个页面对应一个目录，目录可以嵌套，但目录下的文件需要包含请求接口文件和类型定义文件。

下面是一个典型的目录结构 [`src/api/user`](https://github.com/condorheroblog/react-antd-admin/tree/main/src/api/user)：

```zsh
├── api
│   └── user                  # 用户页面, 按照页面划分 api
│       ├── index.ts          # 请求接口文件
│       └── types.ts          # 类型定义文件
```

如果页面下有页面，则可以继续嵌套目录，例如：[`src/api/system`](https://github.com/condorheroblog/react-antd-admin/tree/main/src/api/system)。

## 文件说明

### 类型定义文件

类型变量名一般以对应的页面名作为开始，以 `Type` 结尾，例如：

```ts
export interface RoleItemType {
	id: number
	createTime: number
	updateTime: number
	name: string
	code: string
	status: 1 | 0
	remark: string
}
```

### 请求接口文件

一个经典的请求接口文件如下所示：

> 请求充分利用了 HTTP 方法，request.get、request.post 等，忽略加载动画通过 `ignoreLoading` 参数实现。

特别注意：

1. GET 请求的参数放在 `searchParams` 对象中，POST、PUT 等请求的参数放在 `json` 对象中。
2. 请求的路径不能以 `/` 开头。

```ts
import type { RoleItemType } from "./types";
import { request } from "#src/utils";

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

## `request.ts` 介绍

`request.ts` 是封装了 `[Ky](https://github.com/sindresorhus/ky)` 的请求库，代码实现请看 `[src/utils/request](https://github.com/condorheroblog/react-antd-admin/tree/main/src/utils/request)`。
