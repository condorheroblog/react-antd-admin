import type { AppRouteRecordRaw } from "#src/router/types";

export interface AuthType {
	token: string
	refreshToken: string
}

export interface UserInfoType {
	id: string
	avatar: string
	username: string
	email: string
	phoneNumber: string
	description: string
	roles: Array<string>
	// 路由可以在此处动态添加
	menus?: AppRouteRecordRaw[]
}

export interface AuthListProps {
	label: string
	name: string
	auth: string[]
}
