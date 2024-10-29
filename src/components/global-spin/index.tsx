import type { ReactNode } from "react";
import { useAnimationStore, useGlobalStore } from "#src/store";
import { Spin } from "antd";

import { createUseStyles } from "react-jss";

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
	const transitionLoading = useAnimationStore(state => state.transitionLoading);

	if (!transitionLoading) {
		return children;
	};

	return (
		<Spin spinning={spinning} wrapperClassName={classes.rootSpin}>
			{children}
		</Spin>
	);
}
