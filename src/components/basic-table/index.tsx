import type { ParamsType, ProTableProps } from "@ant-design/pro-components";

import type { TablePaginationConfig } from "antd";

import { footerHeight as layoutFooterHeight } from "#src/layout/constants";
import { usePreferencesStore } from "#src/store";
import { cn, isObject, isUndefined } from "#src/utils";

import { LoadingOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { useSize } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { BASIC_TABLE_ROOT_CLASS_NAME } from "./constants";
import { useStyles } from "./styles";

export interface BasicTableProps<D, U, V> extends ProTableProps<D, U, V> {
	/**
	 * @description 自适应内容区高度，如果设置了 scroll.y，则不进行自适应
	 * @default false
	 */
	adaptive?: boolean | {
		/** 表格距离页面底部的偏移量，默认值为 `16` */
		offsetBottom?: number
	}
}

export function BasicTable<
	DataType extends Record<string, any>,
	Params extends ParamsType = ParamsType,
	ValueType = "text",
>(
	props: BasicTableProps<DataType, Params, ValueType>,
) {
	const classes = useStyles();
	const { t } = useTranslation();
	const { adaptive } = props;
	const tableWrapperRef = useRef<HTMLDivElement>(null);
	const size = useSize(tableWrapperRef);
	const {
		enableFooter,
		fixedFooter,
	} = usePreferencesStore();
	/**
	 * @description 动态表格中为什么设置 scrollY 为 initial
	 * @see https://gist.github.com/condorheroblog/557c18c61084a1296b716bcb1203315e
	 */
	const [scrollY, setScrollY] = useState<number | string | undefined>(adaptive ? "initial" : undefined);

	/**
	 * @description 固定页脚的高度
	 * 如果启用了页脚并且页脚是固定的，则返回页脚的高度，否则返回 0
	 */
	const footerHeight = useMemo(() => {
		if (enableFooter && fixedFooter) {
			return layoutFooterHeight;
		}
		return 0;
	}, [enableFooter, fixedFooter]);

	const getPaginationProps = () => {
		if (props.pagination === false) {
			return false;
		}

		return {
			position: ["bottomRight"],
			defaultPageSize: 10,
			showQuickJumper: true,
			showSizeChanger: true,
			showTotal: total => t("common.pagination", { total }),
			...props.pagination,
		} satisfies TablePaginationConfig;
	};

	/**
	 * @description 计算分页器的高度
	 * 如果分页器被禁用，则返回 0，否则根据分页器的大小返回相应的高度
	 *
	 *
	 * 无法通过获取 DOM 的方式来计算分页器的高度，因为 pagination 是子组件，父组件无法加载子组件还未加载
	 */
	const paginationHeight = useMemo(() => {
		const paginationProps = getPaginationProps();
		const isPaginationDisabled = paginationProps === false;
		if (isPaginationDisabled) {
			return 0;
		}
		else {
			if (paginationProps.size === "default") {
				// 默认分页器高度为 32px
				return 32 + 16 + 16;
			}
			else {
				// 小分页器高度为 24px
				return 24 + 16 + 16;
			}
		}
	}, [getPaginationProps]);

	/**
	 * @description 表格高度自适应
	 * 这是一个 hook 方法，等待 antd 修复
	 * @see https://github.com/ant-design/ant-design/issues/23974
	 */
	useEffect(() => {
		if (!isUndefined(props.scroll?.y)) {
			// 如果 scroll.y 已经被设置，则不进行高度自适应
			return;
		}

		if (adaptive && tableWrapperRef.current && size?.height) {
			const basicTable = tableWrapperRef.current.getElementsByClassName(BASIC_TABLE_ROOT_CLASS_NAME)[0];

			if (!basicTable)
				return;

			const tableWrapperRect = tableWrapperRef.current.getBoundingClientRect();

			// 如果表格在屏幕外，不进行高度自适应
			if (tableWrapperRect.top > window.innerHeight) {
				return;
			}

			const tableBody = basicTable.querySelector("div.ant-table-body");

			if (!tableBody)
				return;

			// 获取元素的边界框
			const tableBodyRect = tableBody.getBoundingClientRect();

			// 16 是 BasicContent 的 padding 值
			const offsetBottom = isObject(adaptive) ? (adaptive.offsetBottom ?? 16) : 16;

			const realOffsetBottom = offsetBottom + paginationHeight + footerHeight;

			const bodyHeight = window.innerHeight - tableBodyRect.top - realOffsetBottom;
			/**
			 * @zh scroll.y 设置的是 max-height，所以需要手动设置高度
			 * @en scroll.y sets the max-height, so we need to set the height manually
			 */
			tableBody.setAttribute("style", `overflow-y: auto;min-height: ${bodyHeight}px;max-height: ${bodyHeight}px;`);
			setScrollY(bodyHeight);
		}
	}, [size, adaptive, paginationHeight, footerHeight, props.scroll?.y]);

	const getLoadingProps = () => {
		if (props.loading === false) {
			return false;
		}
		if (props.loading === true) {
			return true;
		}
		return {
			indicator: <LoadingOutlined spin />,
			...props.loading,
		};
	};

	return (
		<div className="h-full" ref={tableWrapperRef}>
			<ProTable
				cardBordered
				rowKey="id"
				dateFormatter="string"
				{...props}
				options={{
					fullScreen: true,
					...props.options,
				}}
				rootClassName={cn(BASIC_TABLE_ROOT_CLASS_NAME, props.rootClassName)}
				className={cn(classes.basicTable, props.className)}
				scroll={{ y: scrollY, x: "max-content", ...props.scroll }}
				loading={getLoadingProps()}
				pagination={getPaginationProps()}
				expandable={{
					// expandIcon: ({ expanded, onExpand, record }) => {
					// 	return expanded
					// 		? (
					// 			<RightOutlined onClick={e => onExpand(record, e)} />
					// 		)
					// 		: (
					// 			<DownOutlined onClick={e => onExpand(record, e)} />
					// 		);
					// },
					...props.expandable,
				}}
			/>
		</div>
	);
}
