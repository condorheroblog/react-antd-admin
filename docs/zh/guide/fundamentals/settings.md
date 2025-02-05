# 配置

## 环境变量和模式

项目使用 Vite 构建的，所以 Vite 的环境变量可直接在本项目使用，如果不了解 Vite 的环境变量和模式，可点击链接 [Vite Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html) 直接学习。

### Vite 环境变量

这三个文件最为常用： `.env`、`.env.development`、`.env.production`。

```bash
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

**只有以 `VITE_` 开头的变量会被正确加载**：

::: tip

```ts
VITE_SOME_KEY = 123;
```

在项目代码中可以这样访问：

```ts
console.log(import.meta.env.VITE_SOME_KEY); // 123
```

:::

#### 环境优先级

指定模式的文件（例如 .env.production）会比通用形式的优先级更高（例如 .env）。

另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 .env 类文件覆盖。例如当运行 `VITE_SOME_KEY=123 vite build` 的时候。

.env 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效。

## 项目环境配置

::: code-group

```bash [.env]
# 后端 API 前缀
VITE_API_BASE_URL = "/api"

# 登录之后默认调转的路由
VITE_BASE_HOME_PATH = "/home"

# 网站标题
VITE_GLOB_APP_TITLE = "React Antd Admin"

```

```bash [.env.development]

```

```bash [.env.production]

```

:::

## 新增一个环境变量

新增一个可动态修改的配置项，只需要按照如下步骤即可：

1. 在环境配置文件，例如 `.env` 新增一个以 `VITE_` 开头的变量，如：

```bash
VITE_PORT=3333
```

2. 在 `src/types/vite-env.d.ts` 文件中新增对应的类型：

```ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string
	readonly VITE_BASE_HOME_PATH: string
	readonly VITE_GLOB_APP_TITLE: string
	readonly VITE_PORT: number // [!code ++]
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
```

3. 通过 `import.meta.env.VITE_PORT` 即可获取配置的值。

## 偏好设置

是否开启路由动画、导航的类型、侧边栏的宽度等等，这些应用的设置被集中到偏好设置中，偏好设置作为一个统一的设置入口，用于动态配置项目的各种功能：

![preferences](/guide/preferences.png)

使用偏好配置设置好之后，可以一键复制到 `src/store/preferences.ts` 文件中找到 `DEFAULT_PREFERENCES` 变量直接，覆盖框架默认配置。

```ts
/**
 * 默认偏好设置
 */
export const DEFAULT_PREFERENCES = {
	/* ================== General ================== */
	language: "zh-CN",
	enableCheckUpdates: true,
	checkUpdatesInterval: 1,
	/* ================== General ================== */

	/* ================== Theme ================== */
	theme: "auto",
	colorBlindMode: false,
	colorGrayMode: false,
	themeRadius: 6,
	builtinTheme: "blue",
	themeColorPrimary: "#1677ff",
	/* ================== Theme ================== */

	/* ================== Animation ================== */
	transitionProgress: true,
	transitionLoading: true,
	transitionEnable: true,
	transitionName: "fade-slide",
	/* ================== Animation ================== */

	/* ================== Layout ================== */
	navigationStyle: SIDE_NAVIGATION,
	sidebarWidth: 210,
	sideCollapseWidth: COLLAPSED_WIDTH,
	/* ================== Layout ================== */

	/* ================== Tabbar ================== */
	tabbarEnable: true,
	tabbarShowIcon: true,
	tabbarPersist: true,
	tabbarDraggable: true,
	tabbarStyleType: "chrome",
	tabbarShowMore: true,
	tabbarShowMaximize: true,
	/* ================== Tabbar ================== */
} satisfies PreferencesState;
```

::: warning 注意

- 覆盖默认偏好设置之后，需要点击偏好设置右上角的重置按钮。
- 或者更改配置后直接清空缓存。

:::
