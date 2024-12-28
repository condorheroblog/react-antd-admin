import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(({ prefixCls, isDark }) => {
	return {
		basicTable: {
			[`& .${prefixCls}-table`]: {
				[`& .${prefixCls}-table-container`]: {
					[`& .${prefixCls}-table-content, & .${prefixCls}-table-body`]: {
						"scrollbar-width": "thin",
						"scrollbar-color": isDark ? "#909399 transparent" : "#eaeaea transparent",
						"scrollbar-gutter": "stable",
					},
				},
			},
		},
	};
});
