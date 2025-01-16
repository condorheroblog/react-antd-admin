## i18n

国际化使用 [`react-i18next`](https://react.i18next.com/) 开发。在 VS Code 中使用 [`i18n Ally`](https://github.com/lokalise/i18n-ally) 插件获得友好的国际化提示。

当前默认支持中英文两种语言，源文件位于 `src/locales` 中，如果需要新增语言支持，确保文件名是 [ISO 639-1](https://www.andiamo.co.uk/resources/iso-language-codes/) 规范里面的，而不是自己随便写。

某个语言下需要包含的文件结构如下所示：

```bash
├── locales
│   ├── README.md
│   ├── en-US
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

如果新建一个路由，只需要新建一个对应的文件即可。

## 国际化 Key 的规范

本项目翻译文件 JSON 的 key 优先使用嵌套风格，而不是扁平风格，例如：

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

更多内容请查看 [国际化章节](https://condorheroblog.github.io/react-antd-admin/docs/zh/guide/advanced/locale)。
