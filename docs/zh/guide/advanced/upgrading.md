# 项目升级指南 {#upgrading}

### 升级依赖

直接运行 npm-check 命令，它会列出所有依赖项的最新版本并自动安装。

```bash
pnpm run npm-check
```

如果想要关闭自动安装，需要修改根目录下的 `taze.config.js` 文件，将 `install` 设置为 `false`。

更多用法参考 [taze](https://github.com/antfu-collective/taze?tab=readme-ov-file#config-file)。

### 对等依赖不兼容

某些情况下可能遇到对等依赖不兼容，例如 `react-scroll`、`react-scrollama` 和 `rooks` 对等依赖未列出 `react@19`。

可以通过 `package.json` 文件的 overrides 字段解决。

```json
{
	"overrides": {
		"react-pdf": {
			"react": "$react",
			"react-dom": "$react-dom"
		},
		"react-scroll": {
			"@types/react": "$react",
			"react": "$react",
			"react-dom": "$react-dom"
		},
		"react-scrollama": {
			"react": "$react",
			"react-dom": "$react-dom"
		},
		"rooks": {
			"react": "$react",
			"react-dom": "$react-dom"
		}
	}
}
```
