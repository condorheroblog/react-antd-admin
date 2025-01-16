import type { MenuItemType } from "#src/api/system";
import { fetchAddMenuItem, fetchUpdateMenuItem } from "#src/api/system";
import { handleTree } from "#src/utils";

import {
	ModalForm,
	ProFormCascader,
	ProFormDependency,
	ProFormDigit,
	ProFormRadio,
	ProFormSelect,
	ProFormText,
	ProFormTreeSelect,
} from "@ant-design/pro-components";
import { Form } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getMenuTypeOptions } from "../constants";

interface DetailProps {
	title: React.ReactNode
	flatParentMenus: MenuItemType[]
	open: boolean
	detailData: Partial<MenuItemType>
	onCloseChange: () => void
	refreshTable?: () => void
}

export function Detail({
	title,
	open,
	flatParentMenus,
	onCloseChange,
	detailData,
	refreshTable,
}: DetailProps) {
	const { t } = useTranslation();
	const [form] = Form.useForm<MenuItemType>();

	const onFinish = async (values: MenuItemType) => {
		// console.info(values);
		/* 有 id 则为修改，否则为新增 */
		if (detailData.id) {
			await fetchUpdateMenuItem(values);
			window.$message?.success(t("common.updateSuccess"));
		}
		else {
			await fetchAddMenuItem(values);
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
		<ModalForm<MenuItemType>
			title={title}
			open={open}
			onOpenChange={(visible) => {
				if (visible === false) {
					onCloseChange();
				}
			}}
			labelCol={{ md: 5, xl: 3 }}
			// wrapperCol={{ span: 24 }}
			layout="horizontal"
			form={form}
			autoFocusFirstInput
			modalProps={{
				destroyOnClose: true,
			}}
			grid
			width={{
				xl: 800,
				md: 500,
			}}
			onFinish={onFinish}
			initialValues={{
				menuType: 0,
				status: 1,
			}}
		>

			<ProFormRadio.Group
				fieldProps={{
					buttonStyle: "solid",
				}}
				name="menuType"
				label={t("system.menu.menuType")}
				radioType="button"
				required
				options={getMenuTypeOptions(t)}
			/>

			<ProFormCascader
				name="parentId"
				label={t("system.menu.parentMenu")}
				fieldProps={{
					showSearch: true,
					autoClearSearchValue: true,
					fieldNames: {
						label: "name",
						value: "id",
						children: "children",
					},
				}}
				request={async () => {
					return handleTree(flatParentMenus);
				}}
			/>

			<ProFormDependency name={["menuType"]}>
				{({ menuType }) => {
					if (Number(menuType) === 0) {
						return (
							<>
								<ProFormText
									allowClear
									rules={[
										{
											required: true,
										},
									]}
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
									name="name"
									label={t("system.menu.name")}
									tooltip={t("form.length", { length: 24 })}
								/>

								<ProFormText
									allowClear
									rules={[
										{
											required: true,
										},
									]}
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
									name="path"
									label={t("system.menu.routePath")}
								/>

								<ProFormDigit
									allowClear
									rules={[
										{
											required: true,
										},
									]}
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
									name="order"
									label={t("system.menu.menuOrder")}
								/>

								<ProFormText
									allowClear
									rules={[
										{
											required: true,
										},
									]}
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
									name="icon"
									label={t("system.menu.menuIcon")}
								/>

								<ProFormText
									allowClear
									rules={[
										{
											required: true,
										},
									]}
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
									name="component"
									label={t("system.menu.componentUrl")}
								/>

								<ProFormRadio.Group
									name="status"
									label={t("common.status")}
									radioType="button"
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
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

								<ProFormRadio.Group
									name="keepAlive"
									label={t("system.menu.keepAlive")}
									radioType="button"
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
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

								<ProFormRadio.Group
									name="hideInMenu"
									label={t("system.menu.hideInMenu")}
									radioType="button"
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
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

								<ProFormText
									allowClear
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
									name="currentActiveMenu"
									label={t("system.menu.currentActiveMenu")}
								/>

								<ProFormText
									allowClear
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
									name="iframeLink"
									label={t("system.menu.iframeLink")}
								/>

								<ProFormText
									allowClear
									labelCol={{ md: 5, xl: 6 }}
									colProps={{ md: 24, xl: 12 }}
									name="externalLink"
									label={t("system.menu.externalLink")}
								/>

							</>
						);
					}
				}}
			</ProFormDependency>

		</ModalForm>
	);
};
