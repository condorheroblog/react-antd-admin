---
outline: deep
---

# 路由和菜单

本项目使用 [React Router](https://reactrouter.com/) 的数据路由生成路由，并根据路由自动生成菜单。

## 路由目录

```bash
src/router
├── constants.ts               # 路由常量，包含路由白名单
├── router-global-hooks.ts     # 路由拦截钩子
├── utils                      # 路由工具
├── types                      # 路由类型
├── guards                     # 路由守卫
├── index.ts                   # 路由配置文件
├── extra-info
│   ├── order                  # 路由顺序决定菜单排序
│   └── index.ts               # 聚合导出
└── routes
    ├── core                   # 核心路由
    ├── modules                # 动态路由
    └── static                 # 静态路由
    └── index.ts               # 聚合路由
```

## 路由类型

路由分为三大类：核心路由、静态路由和动态路由。

1. 核心路由应用必须的包含的路由，例如根路由、登录路由、404 路由等；
2. 静态路由或者叫前端路由，是在项目启动时就已经确定的路由；
3. 动态路由或者叫后端路由，在用户登录后，根据用户的权限动态生成的路由。

### 核心路由

核心路由是应用必须的包含的路由，例如根路由、登录路由、404 路由等；核心路由的配置在应用下 `src/router/routes/core` 目录下

::: tip

核心路由主要用于框架的基础功能，业务逻辑路由请放在静态路由或动态路由中。

:::

### 静态路由

静态路由存储在 `src/router/routes/static` 目录下，如果不需要静态路由，保持这个文件夹为空即可。

### 动态路由

动态路由存储在 `src/router/routes/modules` 目录下，如果不需要动态路由，保持这个文件夹为空即可。

默认情况下，动态路由是开启的且会单独发送一个请求获取动态路由，如果动态路由在请求用户详情接口返回，则可以在 `src/router/routes/config` 文件中配置 isSendRoutingRequest 属性为 false 关闭单独的接口请求。

### 如何关闭动态路由

在 `src/router/routes/config` 文件中配置 isDynamicRoutingEnabled 属性为 false，即可关闭动态路由。

::: warning

关闭动态路由后，在 `src/router/routes/index.ts` 中的代码会尝试读取 modules 目录下的路由，方便调试，开启动态路由的情况下，则不会读取 modules 目录下的路由。

:::

### 如何关闭静态路由

保持 `src/router/routes/static` 文件夹为空即可，或者在 `src/router/routes/index.ts` 注释掉静态路由的代码即可。

```ts
/** 静态路由 */
// const staticRoutes: AppRouteRecordRaw[] = mergeRouteModules(staticRouteFiles); // [!code ++]

/** 根路由下的子路由 */
const rootChildRoutes = ascending([
	...coreRouteRootChildren,
	...(!isDynamicRoutingEnabled ? dynamicRoutes : []),
	// ...staticRoutes, // [!code ++]
]);
```

## 路由 id

默认情况下，路由的 `id` 是可选的，为了使用方便，框架使用路由的 path 作为路由的 id，例如: 路由 `{ "path": "/about" }`，生成的路由对象是 `{ "path": "/about", "id": "/about" }`。

::: info

其中根路由的 id 是 `root-route`。
:::

## 路由懒加载

React Router 的路由懒加载 —— [Lazy](https://reactrouter.com/en/main/route/lazy) 需要组件**具名导出**一个 `Component` 属性。

例如：

```tsx
export const Component = () => <div>About</div>;
```

但项目中的组件都是默认导出，即使是使用具名导出也是如下形式：

```tsx
export const About = () => <div>About</div>;
```

**所以不建议使用路由自带的懒加载 API**。

下面演示如何使用路由懒加载，加载默认导出的文件：

::: details 路由懒加载，加载默认导出的文件

```ts
import type { AppRouteRecordRaw } from "#src/router/types";
import { $t } from "#src/locales";
import { about } from "#src/router/extra-info";

import { UserOutlined } from "@ant-design/icons";
import { createElement } from "react";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/about",
		lazy: async () => { // [!code focus:1]
			const About = await import("#src/pages/about"); // [!code focus:1]
			return { Component: About.default }; // [!code focus:1]
		}, // [!code focus:1]
		handle: {
			order: about,
			title: $t("common.menu.about"),
			icon: createElement(UserOutlined),
		},
	},
];

export default routes;
```

:::

推荐使用 React 自带的 `lazy` 函数，这样就可以加载默认导出的文件了。

::: details 推荐使用路由懒加载的方式

```ts
import type { AppRouteRecordRaw } from "#src/router/types";
import { ContainerLayout } from "#src/layout";
import { $t } from "#src/locales";
import { about } from "#src/router/extra-info";

import { UserOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";

const About = lazy(() => import("#src/pages/about")); // [!code ++]

const routes: AppRouteRecordRaw[] = [
	{
		path: "/about",
		Component: About, // [!code ++]
		handle: {
			order: about,
			title: $t("common.menu.about"),
			icon: createElement(UserOutlined),
		},
	},
];

export default routes;
```

:::

::: warning

React 的 lazy 一定要放在模块的顶部，否则使用的方式是无效的，参见 [My lazy component’s state gets reset unexpectedly](https://react.dev/reference/react/lazy#my-lazy-components-state-gets-reset-unexpectedly)

:::

## 索引路由

如果使用了 [索引路由](https://reactrouter.com/en/main/route/route#index) 请把权限、图标等信息写在 `index` 路由中，这样在生成菜单时，会自动获取到权限、图标等信息。

::: details 索引路由示例代码

```ts
import type { AppRouteRecordRaw } from "#src/router/types";
import { ContainerLayout } from "#src/layout";

import { $t } from "#src/locales";
import { home } from "#src/router/extra-info";
import { HomeFilled } from "@ant-design/icons";
import { createElement, lazy } from "react";

const Home = lazy(() => import("#src/pages/home"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/home",
		Component: ContainerLayout,
		handle: {
			order: home,
			title: $t("common.menu.home"),
			icon: createElement(HomeFilled),
		},
		children: [
			{
				index: true,
				Component: Home,
				handle: {
					title: $t("common.menu.home"), // [!code ++]
					icon: createElement(HomeFilled), // [!code ++]
				},
			},
		],
	},
];

export default routes;
```

:::

## 路由的排序

路由的排序，默认是按照 `handle.order` 属性进行排序的，`handle.order` 只在路由的第一层级生效，生效的 order 会决定生成菜单的顺序。

::: details 路由的排序示例代码

```ts
import type { AppRouteRecordRaw } from "#src/router/types";
import { ContainerLayout } from "#src/layout";

import { $t } from "#src/locales";
import { home } from "#src/router/extra-info";
import { HomeFilled } from "@ant-design/icons";
import { createElement, lazy } from "react";

const Home = lazy(() => import("#src/pages/home"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/home",
		Component: ContainerLayout,
		handle: {
			order: home, // [!code ++]
			title: $t("common.menu.home"),
			icon: createElement(HomeFilled),
		},
		children: [
			{
				index: true,
				Component: Home,
				handle: {
					title: $t("common.menu.home"),
					icon: createElement(HomeFilled),
				},
			},
		],
	},
];

export default routes;
```

:::

## 新增页面

新增一个页面的步骤如下：

1. 添加路由文件
2. 添加页面组件

### 添加路由

在对应的路由文件夹下添加一个路由文件，如下：

```ts
import type { AppRouteRecordRaw } from "#src/router/types";
import { ContainerLayout } from "#src/layout";

import { $t } from "#src/locales";
import { home } from "#src/router/extra-info";
import { HomeFilled } from "@ant-design/icons";
import { createElement, lazy } from "react";

const Home = lazy(() => import("#src/pages/home"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/home",
		Component: ContainerLayout,
		handle: {
			order: home,
			title: $t("common.menu.home"),
			icon: createElement(HomeFilled),
		},
		children: [
			{
				index: true,
				Component: Home,
				handle: {
					title: $t("common.menu.home"),
					icon: createElement(HomeFilled),
				},
			},
		],
	},
];

export default routes;
```

### 添加页面组件

在 `#/pages/home/` 目录下，新增文件 `index.tsx` 文件， 内容如下：

```tsx
export default function Home() {
	return <h1>Home Page</h1>;
}
```

### 验证

页面添加完成，访问 `http://localhost:3333/home/` 即可看到新的页面。

## 路由配置

每个路由目录下文件内容的结构和 React Router 的 [Route](https://reactrouter.com/en/main/route/route) 路由配置格式一致。

::: info

详细路由教程建议通读 React Router 的 [Route](https://reactrouter.com/en/main/route/route) 章节。

:::

下面只讲解本项目增加的功能如何配合路由文件一起使用，**新增的功能，只是扩展了路由对象上的字段**，没有任何不兼容的地方。

路由配置项主要在对象路由的 `handle` 属性中，以下是常用的配置项：

```ts {5-9}
const routes = [
	{
		path: "/home",
		Component: ContainerLayout,
		handle: {
			order: home,
			title: $t("common.menu.home"),
			icon: createElement(HomeFilled),
		},
	},
];
```

::: details 路由 handle 的类型：

```ts
export interface RouteMeta {
	/**
	 * 路由标题，通常用于页面标题或者侧边栏菜单显示
	 */
	title: ReactNode

	/**
	 * 设置页面是否开启缓存，开启后页面会缓存，不会重新加载，仅在标签页启用时有效。
	 * @default true
	 */
	keepAlive?: boolean

	/**
	 * 是否在菜单中隐藏，用于控制某些路由不在侧边栏菜单中显示
	 */
	hideInMenu?: boolean

	/**
	 * 菜单图标，用于侧边栏菜单项的图标显示
	 */
	icon?: ReactNode

	/**
	 * 菜单排序，用于控制侧边栏菜单的显示顺序
	 */
	order?: number

	/**
	 * 用于配置页面的权限，只有拥有对应权限的用户才能访问页面，不配置则不需要权限。
	 */
	roles?: string[]

	/**
	 * 页面内按钮级别的权限，用于控制页面内按钮的显示和隐藏
	 */
	permissions?: string[]

	/**
	 * iframe链接，如果路由需要在iframe中加载外部页面时使用
	 */
	iframeLink?: string

	/**
	 * 外部链接，点击后直接在新标签页中打开
	 */
	externalLink?: string

	/**
	 * 是否忽略权限，即无需登录即可访问
	 */
	ignoreAccess?: boolean

	/**
	 * @description 指定当前激活的菜单，适用于动态路由情景下激活父菜单
	 * @example 从父路由 '/user/info' 导航到子路由 '/user/info/1' 时，可以手动手动指定以高亮显示父菜单 '/user/info'
	 */
	currentActiveMenu?: string

	/**
	 * 当前路由为请求后端接口得到的
	 */
	backstage?: boolean
}
```

:::

### title

- 类型：`ReactNode`
- 默认值：`undefined`

路由标题，通常用于页面标题或者侧边栏菜单显示。

### icon

- 类型：`ReactNode`
- 默认值：`undefined`

菜单图标，用于侧边栏菜单项的图标显示。

### order

- 类型：`number`
- 默认值：`0`

菜单排序，用于控制侧边栏菜单的显示顺序。

### roles

- 类型：`string[]`
- 默认值：`undefined`

用于配置页面的权限，只有拥有对应权限的用户才能访问页面，不配置则不需要权限。

### permissions

- 类型：`string[]`
- 默认值：`undefined`

页面内按钮级别的权限，用于控制页面内按钮的显示和隐藏。

### keepAlive

- 类型：`boolean`
- 默认值：`true`

设置页面是否开启缓存，开启后页面会缓存，不会重新加载，仅在标签页启用时有效。

### hideInMenu

- 类型：`boolean`
- 默认值：`false`

是否在菜单中隐藏，用于控制某些路由不在侧边栏菜单中显示。

### iframeLink

- 类型：`string`
- 默认值：`undefined`

iframe 链接，如果路由需要在 iframe 中加载外部页面时使用。

### externalLink

- 类型：`string`
- 默认值：`undefined`

外部链接，点击后直接在新标签页中打开。

### ignoreAccess

- 类型：`boolean`
- 默认值：`false`

是否忽略权限，即无需登录即可访问。

### currentActiveMenu

- 类型：`string`
- 默认值：`undefined`

指定当前激活的菜单，适用于动态路由情景下激活父菜单。

### backstage

- 类型：`boolean`
- 默认值：`false`

当前路由为请求后端接口得到的。
