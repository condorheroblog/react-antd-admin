## Github 部署单页面应用

> https://github.com/rafgraph/spa-github-pages

`spa-github-404-page.mjs` 和 `spa-github-index-page.mjs` 文件用于在 GitHub 上自动化部署本项目。

文件分别对应项目根目录下两个命令：

```json
{
	"scripts": {
		"spa-github-index-page": "node ./scripts/spa-github-index-page.mjs",
		"spa-github-404-page": "node ./scripts/spa-github-404-page.mjs"
	}
}
```
