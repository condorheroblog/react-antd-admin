import type { RoleItemType } from "./types";
import { request } from "#src/utils";

export * from "./types";

export function fetchRoles(data: any) {
	return request.get<ApiListResponse<RoleItemType>>("roles", { searchParams: data }).json();
}
