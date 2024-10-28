import { system } from "#/src/router/extra-info";

import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { resultSuccess } from "./utils";

const systemMenu = [
	// 系统管理
	{
		parentId: 0,
		id: system,
		menuType: 0, // 菜单类型（0 代表菜单、1 代表 iframe、2 代表外链、3 代表按钮）
		title: "common.menu.system",
	},
	{
		parentId: system,
		id: system + 1,
		menuType: 0,
		title: "common.menu.system.user",
	},
	{
		parentId: system,
		id: system + 2,
		menuType: 0,
		title: "common.menu.system.role",
	},
	{
		parentId: system,
		id: system + 3,
		menuType: 0,
		title: "common.menu.system.menu",
	},
	{
		parentId: system,
		id: system + 4,
		menuType: 0,
		title: "common.menu.system.dept",
	},
	{
		parentId: system + 4,
		id: system + 4 + 1,
		menuType: 3,
		title: "新增",
	},
	{
		parentId: system + 4,
		id: system + 4 + 2,
		menuType: 3,
		title: "编辑",
	},
	{
		parentId: system + 4,
		id: system + 4 + 3,
		menuType: 3,
		title: "删除",
	},
];

export default defineFakeRoute([
	// 角色管理
	{
		url: "/role-list",
		method: "get",
		response: ({ body }) => {
			let list = [
				{
					createTime: 1729752330782, // 时间戳（毫秒ms）
					updateTime: 1729752330782,
					id: 1,
					name: "超级管理员",
					code: "admin",
					status: 1, // 状态 1 启用 0 停用
					remark: "超级管理员拥有最高权限",
				},
				{
					createTime: 1729752330782,
					updateTime: 1729752330782,
					id: 2,
					name: "普通角色",
					code: "common",
					status: 1,
					remark: "普通角色拥有部分权限",
				},
			];
			// list = Array.from({ length: 10000 }).flatMap(() => list);
			list = list.filter(item =>
				item.name.includes(body?.name ?? "")
				&& String(item.status).includes(String(body?.status ?? ""))
				&& (!body.code || item.code === body.code),
			);
			return resultSuccess({
				list,
				total: list.length, // 总条目数
				pageSize: 10, // 每页显示条目个数
				current: 1, // 当前页数
			});
		},
	},
	// 角色管理-新增角色
	{
		url: "/role-item",
		method: "post",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// 角色管理-修改角色
	{
		url: "/role-item",
		method: "put",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// 角色管理-删除角色
	{
		url: "/role-item",
		method: "delete",
		response: ({ body }) => {
			return resultSuccess(body);
		},
	},
	// 角色管理-权限-菜单权限
	{
		url: "/role-menu",
		method: "get",
		response: () => {
			return resultSuccess(systemMenu);
		},
	},
	// 角色管理-权限-菜单权限，根据角色 id 查对应菜单
	{
		url: "/role-menu-ids",
		method: "get",
		response: ({ query }) => {
			if (query.id === "1") {
				return resultSuccess(systemMenu.map(item => item.id));
			}
			else if (query.id === "2") {
				return resultSuccess([]);
			}
			return resultSuccess([]);
		},
	},
]);
