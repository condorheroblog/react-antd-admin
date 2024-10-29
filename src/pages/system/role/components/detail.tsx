import type { RoleItemType } from "#src/api/system";
import type { TreeDataNodeWithId } from "#src/components";
import { fetchAddRoleItem, fetchUpdateRoleItem } from "#src/api/system";
import { FormTreeItem } from "#src/components";

import {
	DrawerForm,
	ProFormRadio,
	ProFormText,
	ProFormTextArea,
} from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";
import { useEffect } from "react";

interface DetailProps {
	treeData: TreeDataNodeWithId[]
	title: React.ReactNode
	open: boolean
	detailData: Partial<RoleItemType>
	onCloseChange: () => void
	refreshTable?: () => void
}

export function Detail({ title, open, onCloseChange, detailData, treeData, refreshTable }: DetailProps) {
	const [form] = Form.useForm<RoleItemType>();

	const addRoleItemMutation = useMutation({
		mutationFn: fetchAddRoleItem,
	});
	const updateRoleItemMutation = useMutation({
		mutationFn: fetchUpdateRoleItem,
	});

	const onFinish = async (values: RoleItemType) => {
		// console.info(values);
		/* 有 id 则为修改，否则为新增 */
		if (detailData.id) {
			await updateRoleItemMutation.mutateAsync(values);
		}
		else {
			await addRoleItemMutation.mutateAsync(values);
		}
		/* 刷新表格 */
		refreshTable?.();
		window.$message?.success("操作成功");
		// 不返回不会关闭弹框
		return true;
	};

	useEffect(() => {
		if (open) {
			form.setFieldsValue(detailData);
		}
	}, [open]);

	return (
		<DrawerForm<RoleItemType>
			title={title}
			open={open}
			onOpenChange={(visible) => {
				if (visible === false) {
					onCloseChange();
				}
			}}
			resize={{
				onResize() {
					// console.log('resize!');
				},
				maxWidth: window.innerWidth * 0.8,
				minWidth: 500,
			}}
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 24 }}
			layout="horizontal"
			form={form}
			autoFocusFirstInput
			drawerProps={{
				destroyOnClose: true,
			}}
			onFinish={onFinish}
			initialValues={{
				status: 1,
				menus: [],
			}}
		>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
						message: "请输入角色名称!",
					},
				]}
				width="md"
				name="name"
				label="角色名称"
				tooltip="最长为 24 位"
				placeholder="请输入角色名称"
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
						message: "请输入角色标识!",
					},
				]}
				width="md"
				name="code"
				label="角色标识"
				placeholder="请输入角色标识"
			/>

			<ProFormRadio.Group
				name="status"
				label="角色状态"
				radioType="button"
				options={[
					{
						label: "启用",
						value: 1,
					},
					{
						label: "停用",
						value: 0,
					},
				]}
			/>

			<ProFormTextArea
				allowClear
				width="md"
				name="remark"
				label="备注"
				placeholder="请输入备注"
			/>

			<div>
				<Form.Item name="menus" label="菜单分配">
					<FormTreeItem treeData={treeData} />
				</Form.Item>
			</div>
		</DrawerForm>
	);
};
