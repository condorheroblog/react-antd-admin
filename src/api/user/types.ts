export interface UserInfo {
	userId: string
	avatar: string
	username: string
	nickname: string
	description: string
	lng: string
}

export interface UserResult extends UserInfo {
	roles: Array<string>
	token: string
	refreshToken: string
}

export interface AuthListProps {
	label: string
	name: string
	auth: string[]
}
