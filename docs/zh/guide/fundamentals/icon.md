# 图标 {#icon}

## 为什么使用 SVG？

- Tree Shaking，只打包使用的图标。
- 支持多色图标。
- 矢量可无限缩放。
- 无兼容性问题。
- 轻量级，文件小。
- 支持像字体那样，通过 font-size，color 来调整样式。

## 项目支持的图标库？

### ant design 图标库

项目默认安装 `@ant-design/icons`，可以直接使用 [Ant Design Icons](https://github.com/ant-design/ant-design-icons) 提供的图标：

```ts
import {
	HomeOutlined,
	SettingFilled,
	SmileOutlined,
} from "@ant-design/icons";
// <HomeOutlined />
// <SettingFilled />
// <SmileOutlined />
```

更多图标和用法请查看 [Ant Design Icons](https://ant.design/components/icon-cn) 官网。

### RemixIcon 图标库

项目安装了 [`@iconify-json/ri`](https://www.npmjs.com/package/@iconify-json/ri) 图标库，RemixIcon 图标可直接在项目中使用，点击查看 https://remixicon.com/ 支持的图标

使用方式:

1. 打开[官网](https://remixicon.com/)，搜索图标，复制图标名

例如在官网搜索 sun 图标，点击理想的图标可以看到浏览器地址栏图标的 URL 地址：https://remixicon.com/icon/sun-line

![how-to-get-remix-icon](/public/guide/how-to-get-remix-icon.png)

2. 引入图标

> ~icons 是写死的虚拟路径，ri 是 RemixIcon 的缩写，后面跟上图标名即可。例如：ri/sun-line

```ts
import SunLineIcon from "~icons/ri/sun-line";
```

3. 组件中使用

```tsx
<SunLineIcon className="text-3xl"></SunLineIcon>;
```

## 如何使用其他图标库？

如果要使用其他图标库，例如 [mdi](https://github.com/Templarian/MaterialDesign) 图标库：

1. 安装图标库 `npm install @iconify-json/mdi`
2. **可选择**在 `src/icons` 下创建 mdi 文件，所有使用的图标在此导出。

> 点击 https://github.com/iconify/icon-sets 查看支持的图标库。

如果你想要获取 Iconify 支持的所有图标库，可以直接安装 `@iconify/json`，这样就可以使用 Iconify 支持的所有图标库了。

> 注意因为 `@iconify/json` 包含所有的图标库，npm 下载依赖的时候会比较慢，耐心等待即可。

```bash
npm install --save @iconify/json
```

## 如何自定义图标？

在 `src/icons` 下新建一个 svg 文件夹，所有的 SVG 文件放在这个目录下，然后在 `src/icons/index.ts` 中导出即可，例如：

```ts
// src/icons/index.ts
export { default as ExternalIcon } from "~icons/svg/external";
```

> 如果想要修改存放 SVG 文件的文件夹名称，即 `~icons/svg/user-settings` 路径的 svg，可以在 `vite.config.ts` 文件中找到 `unplugin-icons/vite` 插件的配置进行修改。

其他文件中使用这个图标：

```ts
import { ExternalIcon } from "#src/icons";
// 图标自动响应设置的字体和文字颜色
// <ExternalIcon className="text-xl" />
```

## 如何管理项目中的 SVG 图标？

UI 设计师给提供的图标全部放在 `src/icons/svg` 目录下，在放到项目之前，如何管理这些图标呢？

推荐下面两个在线网站进行项目管理，UI 可以方便上传项目 SVG 文件，开发人员也可以方便下载：

> 十分推荐 [iconfont](https://www.iconfont.cn/) 作为项目管理工具，老品牌值得信赖。

1. [iconfont](https://www.iconfont.cn/)
2. [IconPark](https://bytedance.larkoffice.com/wiki/wikcnrOVHCJQ4V3a7mDvmLjrePf)

当然也可以不使用上面的在线管理工具，比如 UI 在类似 Figma 这种设计软件中维护一个项目，分享给团队成员也是可以的。

## 为什么使用 Iconify 引入图标

每个图标提供商都以自己的方式提供图标组件，项目中使用多种图标库时，需要以完全不同的方式引入图标，一是引入方式较为繁琐，二是无法随意使用任意提供商的图标库，使用 Iconify 则可以做到引入一个技术方案，使用所有图标库。

查看 [Iconify](https://iconify.design) 官网了解更多。

## 为什么不使用在线版 Iconify？

Iconify 推荐使用方式是**在线加载**，用户初次打开页面时，会自动加载项目中使用的图标库并存储在本地（localStorage），后续加载图标时无需再次请求。但这次存在两个问题：

1. 图标闪烁，图标请求服务器存在延迟，用户会先看到一个空白区域，然后图标才出现。
2. Iconify 服务器不可靠，用爱发电的捉着很可能哪天就没钱了，基于项目稳健性考虑，不应该在项目的正式环境中使用 Iconify 的服务器。

基于以上两个重要的原因，**选择图标捆绑项目，一起动态打包**，核心原理使用 [unplugin-icons](https://github.com/antfu/unplugin-icons) 插件进行动态打包。

## SVG 文件的预览和编辑

推荐安装 VSCode 插件 —— [jock.svg](https://marketplace.visualstudio.com/items?itemName=jock.svg)，可以方便的本地预览和编辑 SVG 文件。

## SVG 作为图片？

假如一个 SVG 文件不是图标，仅仅作为图片使用，使用 image 标签或者 SVG 标签直接插入到 HTML 中，需要注意这个文件应该放在 `src/assets/svg` 目录下。

在代码中这样使用：

### 作为组件使用

```ts
import Logo from "#src/assets/svg/logo.svg?react";
// <Logo />
```

### 作为 img 标签的地址

```ts
import logo from "#src/assets/svg/logo.svg?url";
// <img src={logo} alt="logo" />
```

以上功能底层使用了 [svgr](https://react-svgr.com/docs/getting-started) ，且默认开启了压缩，并使用了一下插件来优化和呈现 SVG 文件：

1. [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr)
2. `@svgr/plugin-jsx` 和 `@svgr/plugin-svgo`

## 为什么不使用图标精灵？

如果你喜欢图标精灵，那么可以使用 [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons) 插件来实现图标精灵，但有以下缺点：

1. 图标精灵文件过大，即使只使用一个图标也需要下载整个图标精灵文件。

## 为什么不使用 Unicode、font-class 的方式引用图标？

在 SVG 广泛应用之前，Unicode 引用图标的方式（或者它的变体 font-class 方式）是最为流行的，但不可避免的存在以下缺点：

1. 图标字体文件过大，字体文件通常包含上百个图标，即使只使用一个图标也需要下载整个字体文件。
2. 图标字体文件不支持多色，只能单色显示。
3. Unicode 图标的书写方式难以记忆，书写效率低。
4. 字体文件可能阻塞渲染。
5. 可能存在类名冲突的风险。

以上缺点，在 SVG 图标中均不存在。

## 为什么不使用雪碧图的方式引用图标？

雪碧图、精灵图、SVG Sprite 指的都是一种方式，将多个图标合并到一个 SVG 中，然后通过 Symbol 标签来引用图标。

这种方式也存在以下缺点：

1. 图标文件过大，合并多个图标到一个 SVG 中，即使只使用一个图标也需要下载整个文件。
2. 书写效率低，无法直接预览，需要通过 `<use>` 标签来引用图标。

## 为什么不使用 [React Icons](https://react-icons.github.io/react-icons/) ？

因为 [React Icons](https://react-icons.github.io/react-icons/) 无法进行项目管理，项目自定义的本地图标无法使用 [React Icons](https://react-icons.github.io/react-icons/) 的方式进行引用，你必须引入另一种本地图标解决方案，而 Iconfify 不存在这个问题。

为了解决这个缺点，`src/icons/create-icon.ts` 是一个好的参考。

```ts
import { createIconifyIcon } from "#src/icons/create-icon";

export const MoonIcon = createIconifyIcon("svg:moon");
export const SunIcon = createIconifyIcon("svg:sun");
export const FollowSystemIcon = createIconifyIcon("svg:follow-system");
```

## 推荐学习资源

- [Web 端使用-iconfont](https://www.iconfont.cn/help/detail?helptype=code)
- [Journey with Icons Continues](https://antfu.me/posts/journey-with-icons-continues)
