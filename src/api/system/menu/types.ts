export interface MenuItemType {
	parentId: string // 上级菜单 id
	id: number // 菜单 id
	menuType: 0 | 1 | 2 | 3 // 菜单类型（0 代表菜单、1 代表 iframe、2 代表外链、3 代表按钮）
	name: string // 菜单名称
	path: string // 路由路径
	component: string // 组件路径
	order: number // 菜单顺序
	icon: string // 菜单图标
	currentActiveMenu: string // 激活路径
	iframeLink: string // iframe 链接
	keepAlive: number // 是否缓存页面
	externalLink: string // 外链地址
	hideInMenu: number // 是否在菜单中隐藏
	ignoreAccess: number // 是否忽略权限
	status: 1 // 状态（0 停用、1 启用）
	createTime: number
	updateTime: number
}
