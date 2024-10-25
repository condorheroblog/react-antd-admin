import type { ParamsType, ProTableProps } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useSize } from "ahooks";
import { useEffect, useRef } from "react";

export interface ReuseTableProps<D, U, V> extends ProTableProps<D, U, V> {

}

export function ReuseTable<
	DataType extends Record<string, any>,
	Params extends ParamsType = ParamsType,
	ValueType = "text",
>(
	props: ReuseTableProps<DataType, Params, ValueType>,
) {
	const tableWrapperRef = useRef<HTMLDivElement>(null);
	const size = useSize(tableWrapperRef);

	/**
	 * @description 表格高度自适应
	 * 这是一个 hook 方法，等待 antd 修复
	 * @see https://github.com/ant-design/ant-design/issues/23974
	 */
	useEffect(() => {
		if (tableWrapperRef.current && size?.height) {
			const tableWrapperHeight = size.height;
			const reuseTable = tableWrapperRef.current.getElementsByClassName("reuse-table")[0];
			// const antPagination = reuseTable.getElementsByClassName("ant-pagination")[0];
			const tableBody = reuseTable.querySelector("div.ant-table-body")!;

			// 获取元素的边界框
			const tableBodyRect = tableBody.getBoundingClientRect();
			const tableWrapperRect = tableWrapperRef.current.getBoundingClientRect();
			// const antPaginationRect = antPagination?.getBoundingClientRect?.() || 0;
			// 上边距
			const distanceTop = tableBodyRect.top - tableWrapperRect.top;
			// 下边距
			// const distanceBottom = tableBodyRect.bottom - antPaginationRect?.bottom;
			/* pagination 的高度 24，上边距 16，main 标签的 padding-bottom 16 */
			const distanceBottom = 24 + 16 + 16;

			const bodyHeight = Math.max(200, tableWrapperHeight - distanceTop - distanceBottom);
			tableBody.setAttribute("style", `overflow-y: scroll;height: ${bodyHeight}px;max-height: ${bodyHeight}px;`);
		}
	}, [size]);

	return (
		<div className="h-full" ref={tableWrapperRef}>
			<ProTable {...props} rootClassName="reuse-table" scroll={{ y: "99999999999999999" }} />
		</div>
	);
}
