# 快速开始 {#quick-start}

## 前置准备

::: info 环境要求

在启动项目前，你需要确保你的环境满足以下要求：

- [Node.js](https://nodejs.org/en) 版本大于 18.18.0，推荐使用 [fnm](https://github.com/Schniz/fnm)、[nvm](https://github.com/nvm-sh/nvm) 进行版本管理。
- [Git](https://git-scm.com/) 任意版本。

验证环境是否满足以上要求，通过以下命令查看版本：

```bash
# 查看 node 版本
node -v
# 查看 git 版本
git -v
```

:::

## 创建项目

### 获取源码

> 点击直接创建模版项目：[使用这个模板创建仓库](https://github.com/new?template_name=react-antd-admin&template_owner=condorheroblog)

手动获取源码的方式如下：

::: code-group

```sh [GitHub]
npx degit condorheroblog/react-antd-admin react-antd-admin
# or npx giget@latest gh:condorheroblog/react-antd-admin react-antd-admin
```

:::

### 安装依赖

在你的代码目录内打开终端，并执行以下命令:

```bash
# 进入项目目录
cd react-antd-admin

# 使用项目指定的 pnpm 版本进行依赖安装
corepack enable

# 安装依赖
pnpm install
```

::: tip 注意

- 项目使用 `pnpm` 进行依赖安装，默认会使用 `corepack` 来安装指定版本的 `pnpm`。:
- 如果 corepack 无法访问 npm 源，可以设置系统的环境变量为镜像源 `COREPACK_REGISTRY=https://registry.npmmirror.com`，然后执行 `pnpm install`。
- 如果你不想使用 `corepack`，只需要运行 `corepack disable` 即可禁用，然后使用任意版本的 `pnpm` 进行安装。

:::

### 开发

只需要执行以下命令就可以在 `http://localhost:3333` 中看到页面：

```bash
pnpm run dev
```

### 构建

构建该应用只需要执行以下命令：

```bash
pnpm build
```

然后会看到用于发布的 build 文件夹被生成。

### 预览

预览构建的应用只需要执行以下命令：

```bash
pnpm preview
```
