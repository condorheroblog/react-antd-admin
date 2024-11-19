import { useSize } from "ahooks";
import { useRef } from "react";

export function useTableScroll(scrollX: number = 702) {
	const tableWrapperRef = useRef<HTMLDivElement>(null);

	const size = useSize(tableWrapperRef);

	const height = size?.height;

	const result = height && height < 600 ? height - 160 : undefined;

	const scrollConfig = {
		y: result,
		x: scrollX,
	};

	return {
		tableWrapperRef,
		scrollConfig,
	};
}
