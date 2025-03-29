# 国际化

平台的国际化由下面两个库提供支持：

1. [i18next](https://www.i18next.com/)
2. [react-i18next](https://react.i18next.com/)

## IDE 插件

国际化默认使用的是 JSON 文件，这会导致调试和书写非常困难。利用 VSCode 的 `lokalise.i18n-ally` 插件可以获得良好的编写体验和类型提示。

![](/public/guide/lokalise.i18n-ally-plugin.png)

项目已添加如下内容到 `vscode/settings.json` 文件中，你可以修改自定义任何字段：

```json
{
	"i18n-ally.localesPaths": "src/locales",
	// https://github.com/lokalise/i18n-ally/wiki/Path-Matcher
	"i18n-ally.namespace": true,
	"i18n-ally.pathMatcher": "{locale}/{namespaces}.json",
	"i18n-ally.sourceLanguage": "zh-CN",
	"i18n-ally.displayLanguage": "zh-CN",
	"i18n-ally.enabledFrameworks": ["react-i18next"],
	"i18n-ally.keystyle": "nested"
}
```

正确配置之后，将会看到如下友好的页面，代码中被翻译的文字，以及侧边栏中构建的翻译字典树：

![](/public/guide/lokalise.i18n-ally.png)

## 翻译目录

国际化文件默认存储在 `src/locales` 文件夹下面，打开之后，将会看到两个文件夹，默认支持中英文两种语言：

- zh-CN（中文）
- en-US（英文）

> 如果需要新增语言支持，确保文件名是 [ISO 639-1](https://www.andiamo.co.uk/resources/iso-language-codes/) 规范里面的，而不是自己随便写。

以英语为例子，这个语言下包含的文件结构如下所示：

```bash
├── locales
│   ├── README.md
│   ├── en-US
│   │   ├── access.json                # 演示访问权限相关
│   │   ├── authority.json             # 权限相关，例如登录页面等
│   │   ├── common.json                # 通用字段，例如菜单、按钮文字、信息提示等
│   │   ├── form.json                  # 表单相关，例如表单字段、校验信息等
│   │   ├── preferences.json           # 偏好设置相关，例如主题、字体大小等
│   │   ├── widgets.json               # 偏好设置里的控件，例如系统更新等
│   │   ├── -----------                # 以下为页面级别的翻译文件
│   │   ├── system.json                # 系统管理页面
│   │   ├── home.json                  # 首页
│   │   ├── about.json                 # 关于页面
│   │   └── personal-center.json       # 个人中心
```

如果新建一个路由，只需要新建一个对应的 JSON 文件即可。

根据实践，存放翻译的 JSON 文件最好不超过一层，下面两种都是友好的。

![](/public/guide/i18n-translation.png)

## 国际化 Key 的规范

本项目翻译文件 JSON 的 key 优先使用**嵌套风格**，而不是扁平风格，例如：

```json
{
	"a": {
		"b": {
			"c": "..."
		}
	}
}
```

当然你也可以随意修改成扁平风格。

## 如何使用

### 在 JSX 中使用

```tsx
import { useTranslation } from "react-i18next";
export default function About() {
	const { t } = useTranslation();

	return (
		<div>
			{t("about.aboutProject")}
		</div>
	);
}
```

### 在纯 JS 或 TS 文件中使用

不推荐在纯 JS 或 TS 文件中使用 react-i18next，因为切换语言之后，不会自动改变语言，无论是使用 `i18n.t` 还是 `Trans`。

> It does ONLY interpolation. It does not rerender on language change or load any translations needed. Check useTranslation hook or withTranslation HOC for those cases.—— [Trans Component](https://react.i18next.com/latest/trans-component)

如果需要使用，请使用下面的方式：

### 直接传递一个 t 函数

```tsx
import type { TFunction } from "react-i18next";
import { useTranslation } from "react-i18next";

function getMessage(t: TFunction<"translation", undefined>): string {
	return t("about.aboutProject");
}

function About() {
	const { t } = useTranslation();
	return <div>{getMessage(t)}</div>;
}
```

### 内容是动态的

```tsx
// 例如：common.json 文件内容如下：
// {
// 	"sendText": "{{ second }} 秒后重新获取",
// }
import { useTranslation } from "react-i18next";
export default function Login() {
	const { t } = useTranslation();
	return (
		<div>
			{t("common.sendText", { second: 60 })}
		</div>
	);
}
```

### Trans Component

Trans 组件特别适合自定义 HTML 标签，例如：

```tsx
// 例如：authority.json 文件内容如下：
// {
// 	"agree": "我已阅读并同意《<0>隐私政策</0>》和《<1>服务条款</1>》",
// }
import { Trans } from "react-i18next";
export default function Login() {
	return (
		<Trans
			i18nKey="authority.agree"
			components={[
				<Link key={0} to="/terms-of-service" target="_blank" />,
				<Link key={1} to="/privacy-policy" target="_blank" />,
			]}
		/>
	);
}
```

## `$t` 是干什么的？

```ts
/**
 * 获取路径字符串
 *
 * @param path 路径字符串
 * @returns 返回传入的路径字符串
 */
export function $t(path: string) {
	return path;
}
```

可以看到 `$t` 就是简单的返回传入的路径字符串，本函数主要用于 `lokalise.i18n-ally` 插件提供类型提示。

```js
import { $t } from "#src/locales";
const title = $t("common.menu.about");
// 在 VSCode 中，`$t("common.menu.about")` 渲染为 $t(关于),
```
