# 图标 {#icon}

::: warning
请勿使用 Unicode 引用图标（或者它的变体 font-class 引用），因为它不支持彩色图标，需要引入字体文件，使用方式复杂且文件较大，涉及到图标请使用 SVG 图片。
:::

## 为什么使用 SVG？

- 支持多色图标。
- 矢量可无限缩放。
- 无兼容性问题。
- 轻量级，文件小。
- 支持像字体那样，通过 font-size，color 来调整样式。

## ant design 图标

想要使用 [Ant Design Icons](https://github.com/ant-design/ant-design-icons) 提供的图标，在项目中可以直接使用：

```tsx
import {
	HomeOutlined,
	SettingFilled,
	SmileOutlined,
} from "@ant-design/icons";
// <HomeOutlined />
// <SettingFilled />
// <SmileOutlined />
```

更多图标请查看 [Ant Design Icons](https://ant.design/components/icon-cn) 官网。

## SVG 插件

推荐安装 VSCode 插件 —— [jock.svg](https://marketplace.visualstudio.com/items?itemName=jock.svg)，可以方便的本地预览和编辑 SVG 文件。

## SVG 作为图标？

使用了优秀的 [svgr](https://react-svgr.com/docs/getting-started) 来为项目赋能，默认开启了压缩，安装以下插件即可使用：

1. [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr)
2. `@svgr/plugin-jsx` 和 `@svgr/plugin-svgo`

所有的图标放在 [src/icons](https://github.com/condorheroblog/react-antd-admin/tree/main/src/icons) 目录下，在 svg 文件中放入 svg 源文件，然后在 `icons/index.tsx` 文件中导出即可使用。

```tsx
// 导出图标
import Icon from "@ant-design/icons";
import Moon from "./svg/moon.svg?react";
export function MoonIcon(props: Partial<CustomIconComponentProps>) {
	return <Icon component={Moon} {...props} />;
}
```

其他文件中使用这个图标：

```tsx
import { FollowSystemIcon, MoonIcon, SunIcon } from "#src/icons";
// 图标自动响应设置的字体和文字颜色
// <MoonIcon className="text-xl" />
```

## SVG 作为图片？

假如一个 svg 文件不是图标，仅仅作为图片使用，可以把这个文件放在在 `src/assets/svg` 目录下，那么在代码中这样使用：

### 作为组件使用

```tsx
import Logo from "#src/assets/svg/logo.svg?react";
// <Logo />
```

### 作为 img 标签的地址

```tsx
import logo from "#src/assets/svg/logo.svg?url";
// <img src={logo} alt="logo" />
```

## 项目如何管理 SVG 图标？

推荐下面两个在线网站，UI 可以方便上传项目 SVG 文件，开发人员也可以方便下载：

1. [iconfont](https://www.iconfont.cn/help/detail?spm=a313x.help_detail.i1.dfd524534.44ac3a81lKu1J6&helptype=about)
2. [IconPark](https://bytedance.larkoffice.com/wiki/wikcnrOVHCJQ4V3a7mDvmLjrePf)

## 为什么不使用图标精灵？

如果你喜欢图标精灵，那么可以使用 [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons) 插件来实现，但是这个插件需要手动配置，使用起来比较麻烦。

最重要的是，图标精灵使用方式也是以一个组件的方式，所以没必要引入图标精灵。

## 为什么不使用 iconify 图标？

[iconify](https://iconify.design/) 是在线图标且是外网，第一次访问下载图标需要时间，所以第一次加载页面会闪动。，而且 iconify 是外链，万一外链挂了，图标就找不到了。正因为此，我们集成 iconify 到项目中。

但是非常推荐在 iconify 中寻找项目需要的图标，然后下载到本地使用，推荐第一个链接进行查找。

1. [icon-sets](https://icon-sets.iconify.design/)
2. [icones](https://icones.js.org/)
