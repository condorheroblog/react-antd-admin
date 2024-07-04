import { Spin } from "antd";
import type { ReactNode } from "react";
import { createUseStyles } from "react-jss";

import { useGlobalStore } from "#src/store";

export interface GlobalSpinProps {
	children: ReactNode
}

const useStyles = createUseStyles({
	rootSpin: {
		"height": "100%",
		"& .ant-spin-container": {
			height: "100%",
		},
		"& .ant-spin-spinning": {
			maxHeight: "100% !important",
		},
	},
});

export function GlobalSpin({ children }: GlobalSpinProps) {
	const classes = useStyles();

	const spinning = useGlobalStore(state => state.globalSpin);
	return (
		<Spin spinning={spinning} wrapperClassName={classes.rootSpin}>
			{children}
		</Spin>
	);
}
