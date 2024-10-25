import type { RoleItemType } from "#src/api/system";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { fetchRoles } from "#src/api/system";
import { BasicButton, ReuseTable } from "#src/components";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useMutation } from "@tanstack/react-query";
import { Button, Popconfirm } from "antd";
import { useRef } from "react";
import { Detail } from "./components/detail";

const columns: ProColumns<RoleItemType>[] = [
	{
		dataIndex: "index",
		title: "角色编号",
		valueType: "indexBorder",
	},
	{
		title: "角色名称",
		dataIndex: "name",
		disable: true,
		ellipsis: true,
		formItemProps: {
			rules: [
				{
					required: true,
					message: "此项为必填项",
				},
			],
		},
	},
	{
		disable: true,
		title: "角色标识",
		dataIndex: "code",
		filters: true,
		onFilter: true,
		ellipsis: true,
	},
	{
		disable: true,
		title: "状态",
		dataIndex: "status",
		valueType: "select",
		valueEnum: {
			1: {
				text: "启用",
			},
			0: {
				text: "停用",
			},
		},
	},
	{
		title: "备注",
		dataIndex: "remark",
		search: false,
	},
	{
		title: "创建时间",
		dataIndex: "createTime",
		valueType: "date",
		search: false,
	},
	{
		title: "操作",
		valueType: "option",
		key: "option",
		// render: (text, record, _, action) => [
		render: () => [
			<Detail key="editable" title="编辑角色">
				<BasicButton type="link" size="small">编辑</BasicButton>
			</Detail>,
			<Popconfirm
				key="delete"
				title="Delete the task"
				description="Are you sure to delete this task?"
				// onConfirm={confirm}
				// onCancel={cancel}
				okText="Yes"
				cancelText="No"
			>
				<BasicButton type="link" size="small">删除</BasicButton>
			</Popconfirm>,
		],
	},
];

export default function Role() {
	const mutation = useMutation({
		mutationFn: fetchRoles,
	});
	const actionRef = useRef<ActionType>();

	return (
		<>
			<ReuseTable<RoleItemType>
				columns={columns}
				actionRef={actionRef}
				cardBordered
				request={async (params) => {
					// console.log(sort, filter);
					const responseData = await mutation.mutateAsync(params);
					return {
						...responseData,
						data: responseData.result.list,
						total: responseData.result.total,
					};
				}}
				rowKey="id"
				search={{
					layout: "horizontal",
					defaultColsNumber: 3,
					showHiddenNum: true,
					labelWidth: "auto",
				}}
				options={{
					fullScreen: true,
				}}
				form={{
					// 同步结果到 url 中
					syncToUrl: (values, type) => {
						if (type === "get") {
							return {
								...values,
							};
						}
						return values;
					},
				}}
				pagination={{
					position: ["bottomRight"],
					defaultPageSize: 10,
					showQuickJumper: true,
					showSizeChanger: true,
					// showTotal={(total) => `Total ${total} items`}
					showTotal: total => `共 ${total} 条`,
				}}
				dateFormatter="string"
				headerTitle="角色管理（仅演示，操作后不生效）"
				toolBarRender={() => [
					<Detail title="新增角色" key="add-role">
						<Button
							key="button"
							icon={<PlusCircleOutlined />}
							type="primary"
						>
							新增角色
						</Button>
					</Detail>,
				]}
			/>
		</>
	);
};
