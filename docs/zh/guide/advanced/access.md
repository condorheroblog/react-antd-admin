---
outline: [2, 6]
---

# 权限 {#access}

> 在线体验，请访问： https://condorheroblog.github.io/react-antd-admin/access/page-control

项目的权限基于 RBAC（Role-based access control） 进行设计，如果你对 RBAC 不熟悉，自行查找相关资料进行学习。

## 用户

项目模拟了两个用户，分别为：

- [管理员](https://github.com/condorheroblog/react-antd-admin/blob/9bfbd987341e14e61757885a7426b0f88481f78c/fake/user.fake.ts#L21) - 用户名和角色为 admin

- [普通用户](https://github.com/condorheroblog/react-antd-admin/blob/9bfbd987341e14e61757885a7426b0f88481f78c/fake/user.fake.ts#L33) - 用户名和角色为 common

## 角色

项目模拟了两个角色，分别为：

- [admin](https://github.com/condorheroblog/react-antd-admin/blob/9bfbd987341e14e61757885a7426b0f88481f78c/fake/user.fake.ts#L21)

- [common](https://github.com/condorheroblog/react-antd-admin/blob/9bfbd987341e14e61757885a7426b0f88481f78c/fake/user.fake.ts#L33)

## 权限的获取方式

1. 通过前端获取，前端写死路由，路由上有静态的角色，登录之后调用接口获取角色，根据角色加载对应的路由表。
2. 通过后端获取，路由和角色均为动态获取，登录之后调用接口获取角色和路由表。

### 前端访问控制

**实现原理:** 在前端写死所有的路由的权限。初次进入系统只初始化通用的路由，需要权限才能访问的路由并未被加入路由表内。登录后拉取用户角色，通过角色去遍历前端路由表，获取该角色可以访问的路由表，生成路由表，再通过 `router.patchRoutes` 添加到路由实例，实现权限的过滤。

- 优点: 权限设计简单，适合人数不超过 10 人角色固定的小型团队。
- 缺点: 权限设计简单，如果后台改动角色，前台也需要跟着改动，无法适用大型项目。

#### 开启前端访问控制

1. 确保当前模式为前端访问控制模式

打开 `src/store/preferences/index.ts` 文件，在 DEFAULT_PREFERENCES 中将 `enableBackendAccess` 设置为 `false`、`enableFrontendAceess` 设置为 `true`。

```ts
export const DEFAULT_PREFERENCES = {
	enableBackendAccess: false,
	enableFrontendAceess: true,
};
```

2. 配置路由权限

如果不配置角色权限 (roles) ，默认此路由所有用户可见，路由下的细颗粒度权限比如按钮权限需要通过权限码 (permissions) 来控制，下面是一个典型的权限格式。

```json
{
	"handle": {
		"permissions": ["permission:button:get"],
		"roles": ["admin"]
	}
}
```

3. 后端接口返回的角色和路由表的权限匹配

打开浏览器的控制台查看 `/api/user-info` 接口返回的用户信息，查看接口的 roles 字段是否和路由中的匹配。

```json
{
	"code": 200,
	"result": {
		"id": 1,
		"avatar": "https://avatars.githubusercontent.com/u/47056890",
		"username": "Admin",
		"email": "<EMAIL>",
		"phoneNumber": "1234567890",
		"description": "manager",
		"roles": [
			"admin"
		]
	},
	"message": "ok",
	"success": true
}
```

如果 roles 字段被后端设计为一个包含对象的数组，例如：

```json
{
	"roles": [
		{
			"id": "1",
			"name": "admin"
		}
	]
}
```

在 `src/store/user.ts` 中修改 `getUserInfo` 方法，将 roles 字段改为包含字符串的数组即可。

### 后端访问控制

**实现原理:** 通过请求接口动态生成路由表。前端根据后端动态返回的数据结构转为前端路由表，然后通过 `router.patchRoutes` 添加到路由实例，实现权限的动态生成。

- 优点: 权限设计复杂，适合大型项目。
- 缺点: 权限设计复杂，不适合小型团队。

#### 开启后端访问控制

1. 确保当前模式为后端访问控制模式

打开 `src/store/preferences/index.ts` 文件，在 DEFAULT_PREFERENCES 中将 `enableBackendAccess` 设置为 `true`、`enableFrontendAceess` 设置为 `false`。

```ts
export const DEFAULT_PREFERENCES = {
	enableBackendAccess: true,
	enableFrontendAceess: false,
};
```

2. 确保后端接口返回的菜单数据结构正确

后端返回的菜单数据结构可以在这个文件中查看：[`fake/async-routes.fake.ts`](https://github.com/condorheroblog/react-antd-admin/blob/9bfbd987341e14e61757885a7426b0f88481f78c/fake/async-routes.fake.ts)

下面是一个典型的权限格式案例。

```ts
const accessRouter = {
	path: "/access",
	handle: {
		icon: "SafetyOutlined",
		title: "common.menu.access",
		order: access,
	},
	children: [
		{
			path: "/access/page-control",
			handle: {
				icon: "FileTextOutlined",
				title: "common.menu.pageControl",
			},
		},
		{
			path: "/access/button-control",
			handle: {
				icon: "LockOutlined",
				title: "common.menu.buttonControl",
				permissions: [
					"permission:button:get",
					"permission:button:update",
					"permission:button:delete",
					"permission:button:add",
				],
			},
		},
		{
			path: "/access/common-visible",
			handle: {
				icon: "EyeOutlined",
				title: "common.menu.commonVisible",
			},
		},
	],
};
```

## 后端访问控制从用户信息接口中获取权限

默认情况下，后端访问控制会单独发一个接口，即 `get-async-routes` 接口，如果后端的路由数据在调用用户信息接口（user-info） 中返回，比如在 menus 字段中返回，则可以开启如下配置。

打开 `src/router/routes/config.ts` 文件，设置 isSendRoutingRequest 为 false，系统将会读取 user-info 接口的 menus 字段作为路由表。

## 权限控制方式

1. 粗颗粒度权限，例如菜单权限。
2. 细颗粒度权限，例如按钮级别的权限。

## 粗颗粒度权限控制

粗颗粒度权限控制，主要用来控制系统显示的菜单。

1. 如果路由是后端控制则会调用 `src/router/utils/generate-routes-from-backend.ts` 函数进行路由的生成。
2. 如果路由是前端控制则会调用 `src/router/utils/generate-routes-from-frontend.ts` 函数进行路由的生成。

生成的路由表会作为参数传递给 `src/router/utils/generate-menu-items-from-routes.ts` 方法，返回的值为 wholeMenus ，变量自动挂载到全局状态 `access` 中，最后组件自动渲染对应的权限菜单。

## 细颗粒度权限控制

细颗粒度权限控制，主要用来控制按钮的显示。

### 权限码

权限码是细颗粒度权限控制的唯一标识，例如：

```json
{
	"permissions": [
		"permission:button:get",
		"permission:button:update",
		"permission:button:delete",
		"permission:button:add"
	]
}
```

每个路由下的 permissions 字段的值必须是唯一的，为了方便管理权限码，你必须在 `src/hooks/use-access/constants.ts` 文件中定义对应的权限码常量，然后在其他文件中引用。

例如：

```ts
export const accessControlCodes = {
	get: "permission:button:get",
	update: "permission:button:update",
	delete: "permission:button:delete",
	add: "permission:button:add",
};
```

#### 组件方式

引入 AccessControl 组件，需要呈现的内容作为组件的 children 传入，对应的权限码作为组件的 codes 属性传入。

```tsx
import { AccessControl } from "#src/components";
import { accessControlCodes } from "#src/hooks/use-access/constants";

import { Typography } from "antd";

export function AccessDemo() {
	return (
		<>
			<AccessControl codes={accessControlCodes.get}>
				<Typography.Text code>
					{accessControlCodes.get}
				</Typography.Text>
			</AccessControl>

			<AccessControl codes={accessControlCodes.update}>
				<Typography.Text code>
					{accessControlCodes.update}
				</Typography.Text>
			</AccessControl>

			<AccessControl codes={accessControlCodes.delete}>
				<Typography.Text code>
					{accessControlCodes.delete}
				</Typography.Text>
			</AccessControl>

			<AccessControl codes={accessControlCodes.add}>
				<Typography.Text code>
					{accessControlCodes.add}
				</Typography.Text>
			</AccessControl>
		</>
	);
}
```

#### 函数方式

引入 useAccess 钩子，通过 hasAccessByCodes 方法来判断是否有权限。

```tsx
import { AccessControl } from "#src/components";
import { useAccess } from "#src/hooks";
import { accessControlCodes } from "#src/hooks/use-access/constants";

import { Typography } from "antd";

export function AccessDemo() {
	const { hasAccessByCodes } = useAccess();

	return (
		<>
			{
				hasAccessByCodes(accessControlCodes.get) && (
					<Typography.Text code>
						{accessControlCodes.get}
					</Typography.Text>
				)
			}

			{
				hasAccessByCodes(accessControlCodes.update) && (
					<Typography.Text code>
						{accessControlCodes.update}
					</Typography.Text>
				)
			}

			{
				hasAccessByCodes(accessControlCodes.delete) && (
					<Typography.Text code>
						{accessControlCodes.delete}
					</Typography.Text>
				)
			}

			{
				hasAccessByCodes([accessControlCodes.add]) && (
					<Typography.Text code>
						{accessControlCodes.add}
					</Typography.Text>
				)
			}
		</>
	);
}
```

### 角色

为了方便角色，你必须在 `src/hooks/use-access/constants.ts` 文件中定义对应的常量，然后在其他文件中引用。

例如：

```ts
export const AccessControlRoles = {
	admin: "admin",
	common: "common",
};
```

#### 组件方式

引入 AccessControl 组件，需要呈现的内容作为组件的 children 传入，对应的权限码作为组件的 codes 属性传入，判断类型 type 属性设置为 `"role"`。

```tsx
import { AccessControl } from "#src/components";
import { useAccess } from "#src/hooks";
import { AccessControlRoles } from "#src/hooks/use-access/constants";

import { Typography } from "antd";
import { useTranslation } from "react-i18next";

export function AccessDemo() {
	const { t } = useTranslation();
	const { hasAccessByRoles } = useAccess();

	return (
		<>
			<AccessControl type="role" codes={[AccessControlRoles.admin, AccessControlRoles.common]}>
				<Typography.Text code>
					{t("access.adminVisible.title")}
					&nbsp;&&nbsp;
					{t("access.commonVisible.title")}
				</Typography.Text>
			</AccessControl>

			<AccessControl type="role" codes={AccessControlRoles.admin}>
				<Typography.Text code>
					{t("access.adminVisible.title")}
				</Typography.Text>
			</AccessControl>

			<AccessControl type="role" codes={AccessControlRoles.common}>
				<Typography.Text code>
					{t("access.commonVisible.title")}
				</Typography.Text>
			</AccessControl>
		</>
	);
}
```

#### 函数方式

引入 useAccess 钩子，通过 hasAccessByRoles 方法来判断是否有权限。

```tsx
import { AccessControl } from "#src/components";
import { useAccess } from "#src/hooks";
import { AccessControlRoles } from "#src/hooks/use-access/constants";

import { Typography } from "antd";
import { useTranslation } from "react-i18next";

export function AccessDemo() {
	const { t } = useTranslation();
	const { hasAccessByRoles } = useAccess();

	return (
		<>
			{
				hasAccessByRoles([AccessControlRoles.admin, AccessControlRoles.common]) && (
					<Typography.Text code>
						{t("access.adminVisible.title")}
						&nbsp;&&nbsp;
						{t("access.commonVisible.title")}
					</Typography.Text>
				)
			}
			{
				hasAccessByRoles([AccessControlRoles.admin]) && (
					<Typography.Text code>
						{t("access.adminVisible.title")}
					</Typography.Text>
				)
			}
			{
				hasAccessByRoles(AccessControlRoles.common) && (
					<Typography.Text code>
						{t("access.commonVisible.title")}
					</Typography.Text>
				)
			}
		</>
	);
}
```
