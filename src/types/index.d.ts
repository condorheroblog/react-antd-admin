/**
 * 接口返回数据格式
 * data: 接口返回数据
 */
interface ApiResponse<T> {
	code: number
	result: T
	message: string
	success: boolean
}

/**
 * 数组形式的接口返回数据格式
 * list: 接口返回数据
 */
interface ApiListResponse<T> extends ApiResponse<T> {
	result: {
		list: T[]
		total: number
		current: number
	}
}

/**
 * 拉取表格请求参数
 */
interface ApiTableRequest extends Record<string, any> {
	cqs?: string
	pageSize?: number
	current?: number
}

type Recordable<T = any> = Record<string, T>;
