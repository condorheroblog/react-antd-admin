# 标签页 {#tab}

标签页的代码逻辑在 [`src/store/tabs.ts`](https://github.com/condorheroblog/react-antd-admin/blob/main/src/store/tabs.ts) 文件中。

## 标签页的存储方式

用户打开的标签页，会自动存储在浏览器的会话存储（sessionStorage）中，以便在刷新页面后能够恢复。

## 修改标签页的存储方式

如果需要修改持久化存储的方式，在 [`src/store/tabs.ts`](https://github.com/condorheroblog/react-antd-admin/blob/main/src/store/tabs.ts) 中搜索 sessionStorage 替换为 localStorage 即可。

## 修改当前标签页的标题

> 场景描述：现在你有一个任务列表页面，路由为 `/task/list` 页面标题为「任务列表」，点击任务列表页面的详情按钮，会打开一个新的标签页显示任务详情，路由为 `/task/detail/:id` 页面的标题「任务详情」，打开多个任务详情的情况下，仅从标题页的名称上区分不出来当前是哪个任务详情，更好的用户体验是修改任务详情标签页的标题具体的任务名称「任务详情 - 任务名称」。

现在你可以使用 setTableTitle 修改当前标签页的标题，代码如下所示：

```ts
import { useTabsStore } from "#src/store";

export function TaskDetail() {
	const { setTableTitle, resetTableTitle } = useTabsStore();

	// 修改当前标签页的标题，并不会覆盖原有的标题，而是使用新的字段 newTabTitle
	setTableTitle("/task/detail/747872662471888896", "2025 年终总结报告");
}
```

预览对比效果：

![修改当前标签页的标题对比图](/public/guide/modify-the-title-of-the-current-tab.png)

如果需要恢复修改前的标题，可以调用 resetTableTitle 方法重置。

```ts
import { useTabsStore } from "#src/store";

export function TaskDetail() {
	const { resetTableTitle } = useTabsStore();

	resetTableTitle("/task/detail/747872662471888896");
}
```
