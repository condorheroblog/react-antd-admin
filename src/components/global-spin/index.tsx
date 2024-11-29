import type { ReactNode } from "react";
import { useGlobalStore, usePreferencesStore } from "#src/store";

import { cn } from "#src/utils";
import { Spin } from "antd";

import { createUseStyles } from "react-jss";

export interface GlobalSpinProps {
	className?: string
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

export function GlobalSpin({ children, className }: GlobalSpinProps) {
	const classes = useStyles();
	const spinning = useGlobalStore(state => state.globalSpin);
	const transitionLoading = usePreferencesStore(state => state.transitionLoading);

	if (!transitionLoading) {
		return children;
	};

	return (
		<Spin
			/**
			 * 延迟 300ms 后开始渲染，否则可能会出现闪烁
			 *
			 * @see https://github.com/ant-design/ant-design/issues/51828
			 */
			delay={300}
			spinning={spinning}
			wrapperClassName={cn(classes.rootSpin, className)}
		>
			{children}
		</Spin>
	);
}
