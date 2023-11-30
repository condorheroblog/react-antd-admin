import { request } from "#src/utils";

export interface PieDataType {
	value: number;
	code: string;
}
export function fetchPie(data: { by: string | number }) {
	return request
		.get("dashboard/pie", { searchParams: data })
		.json<ApiResponse<PieDataType[]>>();
}

export function fetchLine(data: { range: string }) {
	return request
		.post("dashboard/line", { json: data })
		.json<ApiResponse<string[]>>();
}
