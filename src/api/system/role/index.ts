import type { RoleItemType } from "./types";
import { request } from "#src/utils";

export * from "./types";

/* 获取角色列表 */
export function fetchRoleList(data: any) {
	return request.get<ApiListResponse<RoleItemType>>("role-list", { searchParams: data }).json();
}

/* 新增角色 */
export function fetchAddRoleItem(data: RoleItemType) {
	return request.post<ApiResponse<string>>("role-item", { json: data }).json();
}

/* 修改角色 */
export function fetchUpdateRoleItem(data: RoleItemType) {
	return request.put<ApiResponse<string>>("role-item", { json: data }).json();
}

/* 删除角色 */
export function fetchDeleteRoleItem(id: number) {
	return request.delete<ApiResponse<string>>("role-item", { json: id }).json();
}

/* 获取菜单 */
export function fetchRoleMenu() {
	return request.get<ApiResponse<RoleItemType[]>>("role-menu").json();
}

/* 角色绑定的菜单 id */
export function fetchRoleMenuIds(data: { id: number }) {
	return request.get<ApiResponse<string[]>>("role-menu-ids", { searchParams: data }).json();
}
