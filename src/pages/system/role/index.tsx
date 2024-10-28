import type { RoleItemType } from "#src/api/system";
import type { ActionType, ProColumns, ProCoreActionType } from "@ant-design/pro-components";
import { fetchDeleteRoleItem, fetchRoleList, fetchRoleMenu, fetchRoleMenuIds } from "#src/api/system";
import { BasicButton, ReuseTable } from "#src/components";
import { handleTree } from "#src/utils";

import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, message, Popconfirm, Tag } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Detail } from "./components/detail";

const constantColumns: ProColumns<RoleItemType>[] = [
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
		render: (text, record) => {
			return <Tag color={record.status === 1 ? "success" : "default"}>{text}</Tag>;
		},
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
];

export default function Role() {
	const { t } = useTranslation();
	const [messageApi, contextHolder] = message.useMessage();
	const query = useQuery({ queryKey: ["role-menu"], queryFn: fetchRoleMenu });
	const roleListMutation = useMutation({
		mutationFn: fetchRoleList,
	});
	const roleMenuIdsMutation = useMutation({
		mutationFn: fetchRoleMenuIds,
	});
	const deleteRoleItemMutation = useMutation({
		mutationFn: fetchDeleteRoleItem,
	});
	/* Detail Data */
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [detailData, setDetailData] = useState<Partial<RoleItemType> & { menus?: string[] }>({});

	const actionRef = useRef<ActionType>();

	const handleDeleteRow = async (id: number, action?: ProCoreActionType<object>) => {
		const responseData = await deleteRoleItemMutation.mutateAsync(id);
		await action?.reload?.();
		messageApi.success(`操作成功 userId = ${responseData.result}`);
	};

	const columns: ProColumns<RoleItemType>[] = [
		...constantColumns,
		{
			title: t("common.action"),
			valueType: "option",
			key: "option",
			render: (text, record, _, action) => {
				return [
					<BasicButton
						key="editable"
						type="link"
						size="small"
						onClick={async () => {
							/* 请求角色菜单权限 */
							const responseData = await roleMenuIdsMutation.mutateAsync({ id: record.id });
							setIsOpen(true);
							setTitle("编辑角色");
							setDetailData({ ...record, menus: responseData.result });
						}}
					>
						{t("common.edit")}
					</BasicButton>,
					<Popconfirm
						key="delete"
						title={t("common.confirmDelete")}
						onConfirm={() => handleDeleteRow(record.id, action)}
						okText={t("common.confirm")}
						cancelText={t("common.cancel")}
					>
						<BasicButton type="link" size="small">{t("common.delete")}</BasicButton>
					</Popconfirm>,
				];
			},
		},
	];

	const onCloseChange = () => {
		setIsOpen(false);
		setDetailData({});
	};

	const refreshTable = () => {
		actionRef.current?.reload();
	};

	return (
		<>
			<ReuseTable<RoleItemType>
				columns={columns}
				actionRef={actionRef}
				cardBordered
				request={async (params) => {
					// console.log(sort, filter);
					const responseData = await roleListMutation.mutateAsync(params);
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

					<Button
						key="add-role"
						icon={<PlusCircleOutlined />}
						type="primary"
						onClick={() => {
							setIsOpen(true);
							setTitle("新增角色");
						}}
					>
						新增角色
					</Button>,

				]}
			/>
			<Detail
				title={title}
				open={isOpen}
				onCloseChange={onCloseChange}
				detailData={detailData}
				refreshTable={refreshTable}
				treeData={handleTree(query.data?.result || [])}
			/>
			{contextHolder}
		</>
	);
};
