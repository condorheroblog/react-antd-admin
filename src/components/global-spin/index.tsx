import type { ReactNode } from "react";
import { useGlobalStore, usePreferencesStore } from "#src/store";

import { cn } from "#src/utils";
import { Spin } from "antd";

import { createUseStyles } from "react-jss";
import { useSpinDelay } from "spin-delay";

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
	/**
	 * 接口返回结果时间过短，页面可能会出现闪烁，使用 useSpinDelay 优化 Spin
	 *
	 * @see https://github.com/ant-design/ant-design/issues/51828
	 */
	const loading = useSpinDelay(spinning, { delay: 500, minDuration: 200 });
	const transitionLoading = usePreferencesStore(state => state.transitionLoading);

	if (!transitionLoading) {
		return children;
	};

	return (
		<Spin
			delay={300}
			spinning={loading}
			wrapperClassName={cn(classes.rootSpin, className)}
		>
			{children}
		</Spin>
	);
}
