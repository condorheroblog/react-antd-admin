import type { ParamsType, ProTableProps } from "@ant-design/pro-components";

import type { TablePaginationConfig } from "antd";

import { cn } from "#src/utils/cn";
import { DownOutlined, LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { useSize } from "ahooks";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { BASIC_TABLE_ROOT_CLASS_NAME } from "./constants";
import { useStyles } from "./styles";

export interface BasicTableProps<D, U, V> extends ProTableProps<D, U, V> {
	/**
	 * @description 是否填充父元素
	 * @default true
	 */
	autoHeight?: boolean
	/**
	 * @description 表格底部的偏移量
	 * @default 0
	 */
	offsetBottom?: number
}

/**
 * 当表格始终处于屏幕内时，表格高度是自适应的
 * 如果表格在屏幕内可能不可见或者不位于 main 布局标签内，请设置 autoHeight 为 false，避免表格出现抖动，参考下面的 warning 部分
 */
export function BasicTable<
	DataType extends Record<string, any>,
	Params extends ParamsType = ParamsType,
	ValueType = "text",
>(
	props: BasicTableProps<DataType, Params, ValueType>,
) {
	const classes = useStyles();
	const { t } = useTranslation();
	const { autoHeight = true, offsetBottom } = props;
	const tableWrapperRef = useRef<HTMLDivElement>(null);
	const size = useSize(tableWrapperRef);
	const [scrollY, setScrollY] = useState(autoHeight ? 0 : undefined);

	/**
	 * @description 表格高度自适应
	 * 这是一个 hook 方法，等待 antd 修复
	 * @see https://github.com/ant-design/ant-design/issues/23974
	 */
	useEffect(() => {
		const isPaginationDisabled = props.pagination === false;
		if (autoHeight && tableWrapperRef.current && size?.height) {
			const tableWrapperHeight = size.height;
			const basicTable = tableWrapperRef.current.getElementsByClassName(BASIC_TABLE_ROOT_CLASS_NAME)[0];

			if (!basicTable)
				return;

			const tableWrapperRect = tableWrapperRef.current.getBoundingClientRect();

			// 如果表格超出屏幕高度，不进行高度自适应
			if (tableWrapperRect.top > window.innerHeight) {
				setScrollY(undefined);
				return;
			}

			const tableBody = basicTable.querySelector("div.ant-table-body");

			if (!tableBody)
				return;

			// 获取元素的边界框
			const tableBodyRect = tableBody.getBoundingClientRect();
			// 表格表头的高度
			const tableHeaderHeight = tableBodyRect.top - tableWrapperRect.top;
			/**
			 * 表格分页的高度
			 *
			 * @warning 表格必须是 main 标签的子元素，因为 main 标签的 padding-bottom(16) 会影响表格的高度
			 * pagination 的高度 24，上边距 16，main 标签的 padding-bottom 16
			 *
			 * 无法通过获取分页器 DOM 来计算分页器距离屏幕底部高度的原因：
			 * 1. 分页器的 DOM 可能是 undefined，可能因为分页器是在表格渲染完成后才会渲染
			 * 2. 没有设置 table body 的高度，无法确保分页器位于正确的位置，导致高度计算不准确
			 *
			 */
			const paginationHeight = isPaginationDisabled ? 16 : 24 + 16 + 16;
			const realOffsetBottom = offsetBottom || paginationHeight;

			const bodyHeight = Math.max(400, tableWrapperHeight - tableHeaderHeight - realOffsetBottom);
			if (bodyHeight - tableBodyRect.height <= 10) {
				return;
			}
			tableBody.setAttribute("style", `overflow-y: auto;min-height: ${bodyHeight}px;max-height: ${bodyHeight}px;`);
		}
	}, [size, autoHeight, offsetBottom, props.pagination]);

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
				// 设置 y 为 0，保证 tableBodyRect.height 小于 bodyHeight
				scroll={{ y: scrollY, ...props.scroll }}
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
