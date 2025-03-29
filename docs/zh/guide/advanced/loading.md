# App Loading {#loading}

应用初次启动时或者应用刷新时，出现的加载效果。

![app-loading](/public/guide/app-loading.png)

> 代码在 [app-loading](https://github.com/condorheroblog/react-antd-admin/tree/main/src/plugins/loading.ts)

::: info 特此声明

loading 效果的代码属于 pure-admin
点击查看：https://github.com/pure-admin/vue-pure-admin/blob/cd21f1e050011d8f761094bf8a1e110fb8a33959/index.html#L20-L81

:::

## 为什么？

单页面应用，用户初次进入或者刷新应用，一是会下载大量代码进行页面渲染，二是页面展示前需要时间发送接口请求用户详情和动态路由，这个过程需要用户等待，为了避免用户看到白屏或者短暂的黑屏（暗黑主题），我们使用 loading 效果避免这个问题。

## 原理

进入应用调用 setupLoading 显示 App Loading，请求完用户详情接口调用 hideLoading 函数关闭 Loading。

## 关闭 Loading 效果

在 `src/index.tsx` 文件中，注释或者移除掉 setupLoading 函数。

## Loading2

在 [/src/plugins/loading.ts](https://github.com/condorheroblog/react-antd-admin/tree/main/src/plugins/loading2.ts) 中提供了另一种 loading 效果。

![app-loading2](/public/guide/app-loading2.png)

如果要使用这个 loading 效果，批量替换代码中的 setupLoading 函数为 setupLoading2 即可。

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
