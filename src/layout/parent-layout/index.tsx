// import { Outlet } from "react-router-dom";
import { Suspense, useRef } from "react";
import {
	useLocation,
	useOutlet,
} from "react-router-dom";
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
					onEnter={() => { NProgress.start(); }}
					onEntered={() => { NProgress.done(); }}
					key={location.pathname}
					timeout={0}
					unmountOnExit={false}
				>
					{_ => (
						<div ref={nodeRef}>
							{currentOutlet}
							{/* <Outlet /> */}
						</div>
					)}
				</Transition>
			</TransitionGroup>
		</Suspense>
	);
}
