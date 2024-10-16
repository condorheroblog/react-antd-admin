import { BasicButton } from "#src/components";

import { useTabsStore } from "#src/store";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

/**
 * 切换标签页最大化 / 最小化
 *
 * @returns 返回标签页最大化 / 最小化的按钮组件
 */
export function TabMaximize() {
	const { isMaximize } = useTabsStore(state => ({ isMaximize: state.isMaximize }));
	const { toggleMaximize } = useTabsStore(state => ({ toggleMaximize: state.toggleMaximize }));

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
