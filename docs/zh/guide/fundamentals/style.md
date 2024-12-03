# 样式 {#style}

项目使用 Vite 构建，建议先阅读 Vite CSS 相关文档：https://vite.dev/guide/features#css

除此之外，项目还采用了 CSS in JS 和原子化方案，分别对应的是 [react-jss](https://cssinjs.org/react-jss/) 和 [Tailwind CSS](https://tailwindcss.com/)。

一般来讲，我们推荐使用 Tailwind CSS 来书写 CSS，使用 [react-jss](https://cssinjs.org/react-jss/) 来覆盖 antd 组件的样式。

## 导入 CSS 文件

项目中导入 `.css` 文件，Vite 将会把内容插入到 `<style>` 标签中。

## CSS Modules

> 不推荐使用

在 Vite 中任何以 `.module.css` 为后缀名的 CSS 文件都被认为是一个 [CSS modules](https://github.com/css-modules/css-modules) 文件。导入这样的文件会返回一个相应的模块对象。

::: info example.module.css

```css
.red {
  color: red;
}
```

:::

```jsx
import classes from "./example.module.css";
document.getElementById("foo").className = classes.red;
```

## 项目样式结构

项目中的样式文件统一存放在 `src/styles` 目录下。

```bash
src/styles
├── styles                             # 样式
│   ├── animation.css                  # 动画相关
│   ├── antdTheme.ts                   # antd 主题
│   ├── base.css                       # 基础样式
│   ├── css-variables.ts               # 获取 antd token 的 CSS 变量
│   ├── global.css                     # 全局样式
│   ├── index.css                      # 样式入口文件
└── └── keep-alive.css                 # keep-alive 样式
```

## [react-jss](https://cssinjs.org/react-jss/)

如果样式不多，可以直接在组件中书写，如果样式较多，建议所有的样式提取到 style.tsx 文件中，然后通过 `useStyles` 引入到组件中。

::: info style.ts

```ts
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(({ token }) => {
	return {
		tabsContainer: {
			backgroundColor: token.colorBgContainer,
			borderTop: `1px solid ${token.colorBorderSecondary}`,
			borderBottom: `1px solid ${token.colorBorderSecondary}`,
		},
	};
});
```

createUseStyles 函数的 token 参数可以获取到 antd 的所有 token。

:::

```jsx
import { useStyles } from "./style";

function Tabs() {
	const classes = useStyles();
	return <div className={classes.tabsContainer}>Tabs</div>;
}
```

## [Tailwind CSS](https://tailwindcss.com/)

开箱即用，无需配置。

```html
<div className="bg-red-500 text-white">Hello World</div>
```

## BEM

> 不建议使用

请考虑使用 [Tailwind CSS](https://tailwindcss.com/) 方案，避免类名焦虑和减少 CSS 代码。

## CSS 预处理器

> 不建议使用

当想要使用 CSS 预处理器时，优先考虑使用 [react-jss](https://cssinjs.org/react-jss/) 方案，大部分情况下你不需要引入另外一种样式解决方案。
