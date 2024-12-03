# 主题

如果想要自定义主题请先阅读 antd 的 [色彩](https://ant.design/docs/spec/colors-cn) 和 [定制主题](https://ant.design/docs/react/customize-theme-cn) 章节。

## 品牌色

> 品牌色是体现产品特性和传播理念最直观的视觉元素之一。
> 来源于 [色彩](https://ant.design/docs/spec/colors-cn) 章节。

antd 默认的品牌色为 `#1677ff`，本项目继承了 antd 的品牌色。

## 内置主题

框架中内置了多种主题，可以在 `preferences.ts` 中进行配置：

```ts
// 默认为蓝色
export type BuiltinThemeType = "red" | "volcano" | "orange" | "gold" | "yellow" | "lime" | "green" | "cyan" | "blue" | "geekblue" | "purple" | "magenta" | "gray" | "custom";
export const DEFAULT_PREFERENCES = { builtinTheme: "blue" } satisfies PreferencesState;
```

### 内置主题列表

内置主题是从 antd 提供的基础色板中选取的，根据 antd 的建议选取第六个颜色作为主题色。

> [我们建议选择色板从浅至深的第六个颜色作为主色](https://ant.design/docs/spec/colors-cn#%E5%93%81%E7%89%8C%E8%89%B2%E7%9A%84%E5%BA%94%E7%94%A8)

::: details 内置主题类型列表

```ts
export type BuiltinThemeType =
  | "red"
  | "volcano"
  | "orange"
  | "gold"
  | "yellow"
  | "lime"
  | "green"
  | "cyan"
  | "blue"
  | "geekblue"
  | "purple"
  | "magenta"
  | "gray";
```

:::

### 自定义主题

```ts
export const DEFAULT_PREFERENCES = {
	builtinTheme: "custom", // [!code ++]
	themeColorPrimary: "#1677ff" // [!code ++]
} satisfies PreferencesState;
```

## 黑暗模式

使用暗色算法自动生成：[暗色算法 theme.darkAlgorithm](https://ant.design/docs/react/customize-theme-cn#%E4%BD%BF%E7%94%A8%E9%A2%84%E8%AE%BE%E7%AE%97%E6%B3%95)

## 色弱模式

一般用于特殊场景，将设置为色弱模式，可以在 `preferences.ts` 中进行配置：

::: details 色弱模式的原理

```css
filter: invert(100%)
```

:::

```ts
/**
 * 默认偏好设置
 */
export const DEFAULT_PREFERENCES = {
	colorBlindMode: false, // [!code ++]
} satisfies PreferencesState;
```

## 灰色模式

一般用于特殊场景，将网页置灰，可以在 `preferences.ts` 中进行配置：

::: details 灰色模式的原理

```css
filter : grayscale(100%)
```

:::

```ts
export const DEFAULT_PREFERENCES = {
	colorGrayMode: false, // [!code ++]
} satisfies PreferencesState;
```
