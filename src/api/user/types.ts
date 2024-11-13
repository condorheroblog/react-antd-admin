export interface AuthType {
	token: string
	refreshToken: string
}

export interface UserInfoType {
	userId: string
	avatar: string
	username: string
	email: string
	phoneNumber: string
	description: string
	roles: Array<string>
}

export interface AuthListProps {
	label: string
	name: string
	auth: string[]
}
