import type { MenuItemType } from "#src/api/system";
import type { ProColumns } from "@ant-design/pro-components";
import type { TFunction } from "i18next";

import { getBooleanOptions, getYesNoOptions } from "#src/constants";

import { Tag } from "antd";

export function getMenuTypeOptions(t: TFunction<"translation", undefined>) {
	return [
		{
			label: t("system.menu.menu"),
			value: 0,
		},
		{
			label: t("system.menu.iframe"),
			value: 1,
		},
		{
			label: t("system.menu.externalLink"),
			value: 2,
		},
		{
			label: t("system.menu.button"),
			value: 3,
		},
	];
}

export function getConstantColumns(t: TFunction<"translation", undefined>): ProColumns<MenuItemType>[] {
	return [
		{
			dataIndex: "index",
			title: t("common.index"),
			valueType: "indexBorder",
			width: 80,
		},
		{
			title: t("system.menu.name"),
			dataIndex: "name",
			ellipsis: true,
			width: 200,
			render: (_, record) => {
				return t(record.name);
			},
			formItemProps: {
				rules: [
					{
						required: true,
						message: t("form.required"),
					},
				],
			},
		},
		{
			title: t("system.menu.routePath"),
			dataIndex: "path",
			width: 120,
			filters: true,
			onFilter: true,
			ellipsis: true,
		},
		{
			title: t("system.menu.menuOrder"),
			dataIndex: "order",
			valueType: "digit",
			width: 80,
		},
		{
			title: t("system.menu.menuIcon"),
			dataIndex: "icon",
			width: 130,
		},
		{
			disable: true,
			title: t("common.status"),
			dataIndex: "status",
			valueType: "select",
			width: 80,
			render: (text, record) => {
				return <Tag color={record.status === 1 ? "success" : "default"}>{text}</Tag>;
			},
			valueEnum: {
				1: {
					text: t("common.enabled"),
				},
				0: {
					text: t("common.deactivated"),
				},
			},
		},
		{
			title: t("system.menu.menuType"),
			dataIndex: "menuType",
			width: 100,
			valueEnum: getMenuTypeOptions(t).reduce((acc, curr) => {
				acc[curr.value] = curr.label;
				return acc;
			}, {} as Record<number, string>),
		},
		{
			title: t("system.menu.componentUrl"),
			dataIndex: "component",
			width: 120,
			search: false,
		},
		{
			title: t("system.menu.keepAlive"),
			dataIndex: "keepAlive",
			valueType: "select",
			width: 80,
			render: (_, record) => {
				return t(record.keepAlive ? "common.yes" : "common.no");
			},
			valueEnum: getYesNoOptions(t).reduce((acc, curr) => {
				acc.set(curr.value, curr.label);
				return acc;
			}, new Map()),
		},
		{
			title: t("system.menu.hideInMenu"),
			dataIndex: "hideInMenu",
			valueType: "select",
			width: 120,
			render: (_, record) => {
				return t(record.hideInMenu ? "common.yes" : "common.no");
			},
			valueEnum: getYesNoOptions(t).reduce((acc, curr) => {
				acc.set(curr.value, curr.label);
				return acc;
			}, new Map()),
		},
		{
			title: t("system.menu.currentActiveMenu"),
			dataIndex: "currentActiveMenu",
			width: 120,
		},
		{
			title: t("system.menu.iframeLink"),
			dataIndex: "iframeLink",
			width: 120,
		},
		{
			title: t("system.menu.externalLink"),
			dataIndex: "externalLink",
			width: 120,
		},
		{
			title: t("common.createTime"),
			dataIndex: "createTime",
			valueType: "date",
			width: 150,
			search: false,
		},
		{
			title: t("common.updateTime"),
			dataIndex: "updateTime",
			valueType: "dateTime",
			width: 170,
			search: false,
		},
	];
}
