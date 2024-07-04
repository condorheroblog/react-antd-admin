interface ApiResponse<T> {
	code: number
	result: T
	message: string
	type: "success" | "error" | "warning" | "info"
}

type Recordable<T = any> = Record<string, T>;
