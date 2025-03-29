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

**English** | [中文](./README.zh-CN.md)

## Introduction

react-antd-admin is a middle and back-office solution based on React Hooks, Vite, and TypeScript. It aims to help you quickly build enterprise-level middle and back-office projects, with no additional configuration required, ready to use out of the box.

## Features

- Cutting-edge technology stack: [React Hooks](https://react.dev/)、[TypeScript](https://www.typescriptlang.org/)、[Vite](https://vitejs.dev/)、[ant design](https://ant.design/)、[React Router](https://reactrouter.com/)、[Tailwind CSS](https://tailwindcss.com/docs/installation)
- Intuitive state management library: [Zustand](https://zustand-demo.pmnd.rs/)
- Internationalization: [I18n](https://react.i18next.com/)
- Fetch requests: [Ky](https://github.com/sindresorhus/ky)、[@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/overview)
- Code formatting: [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new/)
- Route-level component caching: [keepalive-for-react](https://github.com/irychen/keepalive-for-react)
- API Mocking: [vite-plugin-fake-server](https://github.com/condorheroblog/vite-plugin-fake-server)
- Permission Routing: Supports both frontend static routing and backend dynamic routing
- Theme Configuration: Built-in multiple theme configurations, supports dark theme, and unified color system for Ant Design and Tailwind CSS

## Preview

[react-antd-admin](https://condorheroblog.github.io/react-antd-admin/)

## Documentation

[react-antd-admin Documentation](https://condorheroblog.github.io/react-antd-admin/docs/)

## Usage

### GitHub Template

[Create a repository using this template](https://github.com/new?template_name=react-antd-admin&template_owner=condorheroblog)

### Clone the project

If you prefer a template without git history, manually execute the following:

```bash
npx degit condorheroblog/react-antd-admin react-antd-admin
# or npx giget@latest gh:condorheroblog/react-antd-admin react-antd-admin
cd react-antd-admin
corepack enable
pnpm i # If you haven't installed pnpm before, run: npm install -g pnpm
```

## Development

### Install

```bash
corepack enable

pnpm install
```

### Run

```bash
pnpm run dev
```

Open your browser and enter [http://localhost:3333](http://localhost:3333) to see the page.

## Build

```bash
pnpm build
```

The build output is by default in the build folder.

## Preview

```bash
pnpm preview
```

## Credits

Thanks to the following excellent projects for providing inspiration:

- [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)  for design inspiration
- [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) for business logic inspiration

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=condorheroblog/react-antd-admin&type=Date)](https://star-history.com/#condorheroblog/react-antd-admin&Date)

## Sponsor

If this project was helpful to you, you can buy the author a takeaway meal.

![Sponsor](https://condorheroblog.github.io/react-antd-admin/docs/sponsor.png)


## License

[MIT](https://github.com/condorheroblog/react-antd-admin/blob/main/LICENSE) License © 2023-Present [Condor Hero](https://github.com/condorheroblog)
