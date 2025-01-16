import type { MenuItemType } from "./types";
import { request } from "#src/utils";

export * from "./types";

/* 获取菜单列表 */
export function fetchMenuList(data: any) {
	return request.get<ApiListResponse<MenuItemType>>("menu-list", { searchParams: data, ignoreLoading: true }).json();
}

/* 新增菜单 */
export function fetchAddMenuItem(data: MenuItemType) {
	return request.post<ApiResponse<string>>("menu-item", { json: data, ignoreLoading: true }).json();
}

/* 修改菜单 */
export function fetchUpdateMenuItem(data: MenuItemType) {
	return request.put<ApiResponse<string>>("menu-item", { json: data, ignoreLoading: true }).json();
}

/* 删除菜单 */
export function fetchDeleteMenuItem(id: number) {
	return request.delete<ApiResponse<string>>("menu-item", { json: id, ignoreLoading: true }).json();
}
