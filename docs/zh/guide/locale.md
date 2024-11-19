# 国际化

平台的国际化由下面两个库提供支持：

1. [i18next](https://www.i18next.com/)
2. [react-i18next](https://react.i18next.com/)

## IDE 插件

国际化默认使用的是 JSON 文件，这会导致调试和书写非常困难。利用 VSCode 的 `lokalise.i18n-ally` 插件可以获得良好的编写体验和类型提示。

![](/public/guide/lokalise.i18n-ally-plugin.png)

当然不要忘记把下面的 json 代码添加到您本地 vscode/settings.json文件中：

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

## 使用

国际化文件默认存储在 `src/locales` 文件夹下面，打开之后，将会看到两个文件夹：

- zh-CN（中文）
- en-US（英文）

其中 common 文件存放的是共用的字段。如果新建一个页面，只需要新建一个对应的文件即可。

根据实践，存放翻译的 JSON 文件最好超过一层，下面两种都是友好的。

![](/public/guide/i18n-translation.png)

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

```js
import { $t } from "#src/locales";
const title = $t("common.menu.about");
```
