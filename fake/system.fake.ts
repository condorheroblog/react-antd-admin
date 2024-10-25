import { defineFakeRoute } from "vite-plugin-fake-server/client";

import { resultSuccess } from "./utils";

export default defineFakeRoute([
	// 角色管理
	{
		url: "/roles",
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
]);
