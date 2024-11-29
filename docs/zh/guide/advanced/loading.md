# App Loading {#loading}

应用初次启动时或者应用刷新时，出现的加载效果。

![app-loading](/public/guide/app-loading.png)

> 代码在 [app-loading](https://github.com/condorheroblog/react-antd-admin/tree/main/src/plugins/loading.ts)

::: info 特此声明

loading 效果的代码属于 pure-admin
点击查看：https://github.com/pure-admin/vue-pure-admin/blob/cd21f1e050011d8f761094bf8a1e110fb8a33959/index.html#L20-L81

:::

## 原理

单页面应用，用户初次进入或者刷新应用，会加载一次 `index.html`，在 React 代码注入到 应用入口之前（`<div id="root"></div>`），页面显示白屏。为了友好的体验，在 `index.html` 显示 loading 效果。

因为 React 代码注入到 `index.html` 后，入口标签的内容最终会被替换，所以不需要担心类名冲突的问题。

::: info React 代码注入前

```html
<div id="root">
	<style>
		.loader {}
	</style>
	<div class="loader"></div>
</div>
```

:::

::: info React 代码注入后

```html
<div id="root">
	<!-- React Code -->
</div>
```
:::

## 关闭

在 `src/index.tsx` 文件中，注释或者移除掉 setupLoading 函数。

## 自定义 loading 效果

编辑文件 `src/plugins/loading.ts`，修改代码即可。

下面几个网站提供了 loading 效果，可以自行选择。

::: tip 推荐

- [CSS Loaders](https://css-loaders.com/)
- [CSS Loader Generator](https://10015.io/tools/css-loader-generator)
- [Loaders](https://cssloaders.github.io/)

:::

## 为什么不使用 vite-plugin-app-loading 插件？

代码非常的简单，引入插件反而比较复杂。

请自行决定，链接在此：https://github.com/hooray/vite-plugin-app-loading
