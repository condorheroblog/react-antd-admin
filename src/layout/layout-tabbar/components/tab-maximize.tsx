import { BasicButton } from "#src/components";
import { useTabsStore } from "#src/store";

import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useShallow } from "zustand/shallow";

/**
 * 切换标签页最大化 / 最小化
 *
 * @returns 返回标签页最大化 / 最小化的按钮组件
 */
export function TabMaximize() {
	/**
	 * useShallow - it may cause infinite loops in zustand v5
	 * https://github.com/pmndrs/zustand/blob/v5.0.0/docs/migrations/migrating-to-v5.md#requiring-stable-selector-outputs
	 */
	const { isMaximize } = useTabsStore(useShallow(state => ({ isMaximize: state.isMaximize })));
	const { toggleMaximize } = useTabsStore(useShallow(state => ({ toggleMaximize: state.toggleMaximize })));

	/** 切换最大化 / 最小化 */
	const onClick = () => {
		toggleMaximize(!isMaximize);
	};

	return (
		<BasicButton
			className="rounded-none"
			type="text"
			size="middle"
			icon={isMaximize ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
			onClick={onClick}
		/>
	);
}
