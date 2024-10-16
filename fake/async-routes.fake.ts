import { system } from "#/src/router/extra-info";
import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { resultSuccess } from "./utils";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const systemManagementRouter = {
	path: "/system",
	handle: {
		icon: "SettingOutlined",
		title: "common.menu.system",
		order: system,
	},
	children: [
		{
			path: "/system/user",
			handle: {
				icon: "UserOutlined",
				title: "common.menu.system.user",
				roles: ["admin"],
			},
		},
		{
			path: "/system/role",
			handle: {
				icon: "TeamOutlined",
				title: "common.menu.system.role",
				roles: ["admin"],
			},
		},
		{
			path: "/system/menu",
			handle: {
				icon: "MenuOutlined",
				title: "common.menu.system.menu",
				roles: ["admin"],
			},
		},
		{
			path: "/system/dept",
			handle: {
				icon: "ApartmentOutlined",
				title: "common.menu.system.dept",
				roles: ["admin"],
			},
		},
	],
};

// const systemMonitorRouter = {
// 	path: "/monitor",
// 	meta: {
// 		icon: "ep:monitor",
// 		title: "menus.pureSysMonitor",
// 		order: monitor,
// 	},
// 	children: [
// 		{
// 			path: "/monitor/online-user",
// 			component: "monitor/online/index",
// 			name: "OnlineUser",
// 			meta: {
// 				icon: "ri:user-voice-line",
// 				title: "menus.pureOnlineUser",
// 				roles: ["admin"],
// 			},
// 		},
// 		{
// 			path: "/monitor/login-logs",
// 			component: "monitor/logs/login/index",
// 			name: "LoginLog",
// 			meta: {
// 				icon: "ri:window-line",
// 				title: "menus.pureLoginLog",
// 				roles: ["admin"],
// 			},
// 		},
// 		{
// 			path: "/monitor/operation-logs",
// 			component: "monitor/logs/operation/index",
// 			name: "OperationLog",
// 			meta: {
// 				icon: "ri:history-fill",
// 				title: "menus.pureOperationLog",
// 				roles: ["admin"],
// 			},
// 		},
// 		{
// 			path: "/monitor/system-logs",
// 			component: "monitor/logs/system/index",
// 			name: "SystemLog",
// 			meta: {
// 				icon: "ri:file-search-line",
// 				title: "menus.pureSystemLog",
// 				roles: ["admin"],
// 			},
// 		},
// 	],
// };

// const permissionRouter = {
// 	path: "/permission",
// 	meta: {
// 		title: "menus.purePermission",
// 		icon: "ep:lollipop",
// 		order: permission,
// 	},
// 	children: [
// 		{
// 			path: "/permission/page/index",
// 			name: "PermissionPage",
// 			meta: {
// 				title: "menus.purePermissionPage",
// 				roles: ["admin", "common"],
// 			},
// 		},
// 		{
// 			path: "/permission/button",
// 			meta: {
// 				title: "menus.purePermissionButton",
// 				roles: ["admin", "common"],
// 			},
// 			children: [
// 				{
// 					path: "/permission/button/router",
// 					component: "permission/button/index",
// 					name: "PermissionButtonRouter",
// 					meta: {
// 						title: "menus.purePermissionButtonRouter",
// 						auths: [
// 							"permission:btn:add",
// 							"permission:btn:edit",
// 							"permission:btn:delete",
// 						],
// 					},
// 				},
// 				{
// 					path: "/permission/button/login",
// 					component: "permission/button/perms",
// 					name: "PermissionButtonLogin",
// 					meta: {
// 						title: "menus.purePermissionButtonLogin",
// 					},
// 				},
// 			],
// 		},
// 	],
// };

// const tabsRouter = {
// 	path: "/tabs",
// 	meta: {
// 		icon: "ri:bookmark-2-line",
// 		title: "menus.pureTabs",
// 		order: tabs,
// 	},
// 	children: [
// 		{
// 			path: "/tabs/index",
// 			name: "Tabs",
// 			meta: {
// 				title: "menus.pureTabs",
// 				roles: ["admin", "common"],
// 			},
// 		},
// 		// query 传参模式
// 		{
// 			path: "/tabs/query-detail",
// 			name: "TabQueryDetail",
// 			meta: {
// 				// 不在menu菜单中显示
// 				showLink: false,
// 				activePath: "/tabs/index",
// 				roles: ["admin", "common"],
// 			},
// 		},
// 		// params 传参模式
// 		{
// 			path: "/tabs/params-detail/:id",
// 			component: "params-detail",
// 			name: "TabParamsDetail",
// 			meta: {
// 				// 不在menu菜单中显示
// 				showLink: false,
// 				activePath: "/tabs/index",
// 				roles: ["admin", "common"],
// 			},
// 		},
// 	],
// };

export default defineFakeRoute([
	{
		url: "/api/get-async-routes",
		method: "get",
		response: () => resultSuccess(
			[
				systemManagementRouter,
				// systemMonitorRouter,
				// permissionRouter,
				// frameRouter,
				// tabsRouter,
			],
		),
	},
]);
