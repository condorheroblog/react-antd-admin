/**
 * 菜单项目类型
 */
export interface MenuItemType {
	/**
	 * 菜单路径,item 的唯一标志
	 */
	key: string
	/**
	 * 菜单项标题
	 */
	label: React.ReactNode
	/**
	 * 子菜单的菜单项
	 */
	children?: MenuItemType[]
	/**
	 * 菜单图标
	 */
	icon?: React.ReactNode
	/**
	 * 是否禁用菜单
	 * @default false
	 */
	disabled?: boolean
}
