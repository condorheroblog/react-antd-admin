import { Suspense, useRef } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";

import { NProgress } from "#src/utils";

export default function ParentLayout() {
	const currentOutlet = useOutlet();
	const location = useLocation();
	const nodeRef = useRef(null);

	return (
		<Suspense>
			<TransitionGroup>
				<Transition
					nodeRef={nodeRef}
					/**
					 * 当进入某个状态或页面时调用的方法。
					 * 启动页面加载进度条。
					 *
					 * Method called when entering a certain state or page.
					 * Starts the page loading progress bar.
					 */
					onEnter={() => { NProgress.start(); }}
					/**
					 * 当完全进入某个状态或页面时调用的方法。
					 * 结束页面加载进度条。
					 *
					 * Method called when fully entering a certain state or page.
					 * Ends the page loading progress bar.
					 */
					onEntered={() => { NProgress.done(); }}
					key={location.pathname}
					timeout={0}
					unmountOnExit={false}
				>
					{_ => (
						<div ref={nodeRef}>
							{currentOutlet}
						</div>
					)}
				</Transition>
			</TransitionGroup>
		</Suspense>
	);
}
