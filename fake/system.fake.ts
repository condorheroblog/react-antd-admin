import { system } from "#/src/router/extra-info";

import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { resultSuccess } from "./utils";

const systemMenu = [
	// 系统管理
	{
		id: system,
		menuType: 0, // 菜单类型（0 代表菜单、1 代表 iframe、2 代表外链、3 代表按钮）
		name: "common.menu.system",
	},
	{
		parentId: system,
		id: system + 1,
		menuType: 0,
		name: "common.menu.user",
	},
	{
		parentId: system,
		id: system + 2,
		menuType: 0,
		name: "common.menu.role",
	},
	{
		parentId: system,
		id: system + 3,
		menuType: 0,
		name: "common.menu.menu",
	},
	{
		parentId: system,
		id: system + 4,
		menuType: 0,
		name: "common.menu.dept",
	},
	{
		parentId: system + 4,
		id: system + 4 + 1,
		menuType: 3,
		name: "common.add",
	},
	{
		parentId: system + 4,
		id: system + 4 + 2,
		menuType: 3,
		name: "common.edit",
	},
	{
		parentId: system + 4,
		id: system + 4 + 3,
		menuType: 3,
		name: "common.delete",
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
				&& (!body?.code || item.code === body?.code),
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
		url: "/menu-by-role-id",
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
	// 菜单管理
	{
		url: "/menu-list",
		method: "get",
		response: () => {
			const menuList = [
				// 系统管理
				{
					parentId: "", // 上级菜单 id
					id: system, // 菜单 id
					menuType: 0, // 菜单类型（0 代表菜单、1 代表 iframe、2 代表外链、3 代表按钮）
					name: "common.menu.system", // 菜单名称
					path: "/system", // 路由路径
					component: "/system", // 组件路径
					order: system, // 菜单顺序
					icon: "SettingOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 1,
					menuType: 0,
					name: "common.menu.user",
					path: "/system/user", // 路由路径
					component: "/system/user", // 组件路径
					order: undefined, // 菜单顺序
					icon: "UserOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 2,
					menuType: 0,
					name: "common.menu.role",
					path: "/system/role", // 路由路径
					component: "/system/role", // 组件路径
					order: undefined, // 菜单顺序
					icon: "TeamOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 3,
					menuType: 0,
					name: "common.menu.menu",
					path: "/system/menu", // 路由路径
					component: "/system/menu", // 组件路径
					order: undefined, // 菜单顺序
					icon: "MenuOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system,
					id: system + 4,
					menuType: 0,
					name: "common.menu.dept",
					path: "/system/dept", // 路由路径
					component: "/system/dept", // 组件路径
					order: undefined, // 菜单顺序
					icon: "ApartmentOutlined", // 菜单图标
					currentActiveMenu: "", // 激活路径
					iframeLink: "", // iframe 链接
					keepAlive: true, // 是否缓存页面
					externalLink: "", // 外链地址
					hideInMenu: false, // 是否在菜单中隐藏
					ignoreAccess: false, // 是否忽略权限
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system + 4,
					id: system + 4 + 1,
					menuType: 3,
					name: "common.add",
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system + 4,
					id: system + 4 + 2,
					menuType: 3,
					name: "common.edit",
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
				{
					parentId: system + 4,
					id: system + 4 + 3,
					menuType: 3,
					name: "common.delete",
					status: 1, // 状态（0 停用、1 启用）
					createTime: 1737023155965,
					updateTime: 1737023164653,
				},
			];
			return resultSuccess({
				list: menuList,
				total: menuList.length, // 总条目数
				pageSize: 10, // 每页显示条目个数
				current: 1, // 当前页数
			});
		},
	},
	{
		url: "/menu-item",
		method: "post",
		response: () => {
			return resultSuccess({});
		},
	},
	{
		url: "/menu-item",
		method: "delete",
		response: () => {
			return resultSuccess({});
		},
	},
	{
		url: "/menu-item",
		method: "put",
		response: () => {
			return resultSuccess({});
		},
	},
]);
