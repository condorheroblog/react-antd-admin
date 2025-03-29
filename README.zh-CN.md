<div align="center">
	<a href="https://github.com/condorheroblog/react-antd-admin/">
		<img alt="React-antd-admin Logo" width="192" src="https://github.com/user-attachments/assets/1de76309-4cf5-4e34-a32f-92c361bace2a">
	</a>
	<br />
	<h1>React Antd Admin</h1>
	<br />
</div>

![GitHub license](https://img.shields.io/github/license/condorheroblog/react-antd-admin?style=flat)
![GitHub stars](https://img.shields.io/github/stars/condorheroblog/react-antd-admin?color=fa6470&style=flat)
![GitHub forks](https://img.shields.io/github/forks/condorheroblog/react-antd-admin?style=flat)

**中文** | [English](./README.md)

## 介绍

react-antd-admin 是一个基于 React Hooks、Vite 和 TypeScript 的中后台解决方案。它旨在帮助您快速搭建企业级中后台项目，无需额外配置，开箱即用。

## 特性

- 前沿技术栈：[React Hooks](https://react.dev/)、[TypeScript](https://www.typescriptlang.org/)、[Vite](https://vitejs.dev/)、[ant design](https://ant.design/index-cn/)、[React Router](https://reactrouter.com/)、[Tailwind CSS](https://tailwindcss.com/docs/installation)
- 符合直觉的状态管理库：[Zustand](https://zustand-demo.pmnd.rs/)
- 国际化：[I18n](https://react.i18next.com/)
- Fetch 请求：[Ky](https://github.com/sindresorhus/ky)、[@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/overview)
- 代码格式化：[ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new/)
- 路由级别组件缓存：[keepalive-for-react](https://github.com/irychen/keepalive-for-react)
- API 模拟：[vite-plugin-fake-server](https://github.com/condorheroblog/vite-plugin-fake-server)
- 权限路由：支持前端静态路由和后端动态路由
- 主题配置：内置多种主题配置，支持暗黑主题，统一了 antd 和 Tailwind CSS 的颜色体系

## 预览

[react-antd-admin](https://condorheroblog.github.io/react-antd-admin/)

## 文档

[react-antd-admin 文档](https://condorheroblog.github.io/react-antd-admin/docs/)

## 使用

### GitHub 模板

[使用这个模板创建仓库](https://github.com/new?template_name=react-antd-admin&template_owner=condorheroblog)

### 克隆到本地

如果更喜欢使用没有 git 历史记录的模板，手动执行此操作

```bash
npx degit condorheroblog/react-antd-admin react-antd-admin
# or npx giget@latest gh:condorheroblog/react-antd-admin react-antd-admin
cd react-antd-admin
corepack enable
pnpm i # 如果你没装过 pnpm, 可以先运行: npm install -g pnpm
```

## 开发

### 安装依赖

```bash
corepack enable

pnpm install
```

### 运行

```bash
pnpm run dev
```

打开浏览器输入 [http://localhost:3333](http://localhost:3333) 即可看到页面。

## 构建

```bash
pnpm build
```

构建产物默认在 build 文件夹。

## 预览

```bash
pnpm preview
```

## 致谢

感谢以下优秀项目对本项目提供灵感：

- [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 提供了设计方面的灵感
- [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 提供了业务逻辑方面的灵感

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=condorheroblog/react-antd-admin&type=Date)](https://star-history.com/#condorheroblog/react-antd-admin&Date)

## 赞助

如果此项目对你有帮助，可以请作者吃顿外卖。

![Sponsor](https://condorheroblog.github.io/react-antd-admin/docs/sponsor.png

## License

[MIT](https://github.com/condorheroblog/react-antd-admin/blob/main/LICENSE) License © 2023-Present [Condor Hero](https://github.com/condorheroblog)
