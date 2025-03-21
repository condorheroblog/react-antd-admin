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
import { useTranslation } from "react-i18next";

interface DetailProps {
	treeData: TreeDataNodeWithId[]
	title: React.ReactNode
	open: boolean
	detailData: Partial<RoleItemType>
	onCloseChange: () => void
	refreshTable?: () => void
}

export function Detail({ title, open, onCloseChange, detailData, treeData, refreshTable }: DetailProps) {
	const { t } = useTranslation();
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
			window.$message?.success(t("common.updateSuccess"));
		}
		else {
			await addRoleItemMutation.mutateAsync(values);
			window.$message?.success(t("common.addSuccess"));
		}
		/* 刷新表格 */
		refreshTable?.();
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
					},
				]}
				width="md"
				name="name"
				label={t("system.role.name")}
				tooltip={t("form.length", { length: 24 })}
			/>

			<ProFormText
				allowClear
				rules={[
					{
						required: true,
					},
				]}
				width="md"
				name="code"
				label={t("system.role.id")}
			/>

			<ProFormRadio.Group
				name="status"
				label={t("common.status")}
				radioType="button"
				options={[
					{
						label: t("common.enabled"),
						value: 1,
					},
					{
						label: t("common.deactivated"),
						value: 0,
					},
				]}
			/>

			<ProFormTextArea
				allowClear
				width="md"
				name="remark"
				label={t("common.remark")}
			/>

			<Form.Item name="menus" label={t("system.role.assignMenu")}>
				<FormTreeItem treeData={treeData} />
			</Form.Item>
		</DrawerForm>
	);
};
