interface ApiResponse<T> {
	code: number;
	result: T;
	message: string;
	type: "success" | "error" | "warning" | "info";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Recordable<T = any> = Record<string, T>;
