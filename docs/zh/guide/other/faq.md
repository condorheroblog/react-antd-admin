# 常见问题 {#faq}

::: tip 注意
这里汇总了一些常见问题。
若未找到答案，可在 [GitHub Issue](https://github.com/condorheroblog/react-antd-admin/issues) 中搜索或提交新问题；如需讨论，欢迎前往 [GitHub Discussions](https://github.com/condorheroblog/react-antd-admin/discussions)。
:::

## HMR 热更新无效 {#hmr-invalid}

如果发现修改一个页面没有触发热更新而是重载了整个页面，则代码可能存在循环依赖的问题，有以下两个选择。

1. 可以运行 `vite --debug hmr` 来记录循环依赖路径，如果文件变化触发了它。
2. 运行命令 `npm run check:circular-deps` 来检查循环依赖。

> 更多信息参考：
> 1. [A full reload happens instead of HMR](https://vite.dev/guide/troubleshooting#a-full-reload-happens-instead-of-hmr)
> 2. [react-antd-admin 有哪些文件会触发循环依赖？](https://github.com/condorheroblog/react-antd-admin/issues/11#issuecomment-3514962397)
