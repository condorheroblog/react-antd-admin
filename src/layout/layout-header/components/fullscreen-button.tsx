import type { MutableRefObject } from "react";

import { FullscreenButton as FullscreenButtonComponent, FullscreenExitIcon, FullscreenIcon } from "#src/components";

interface FullscreenProps {
	target: HTMLElement | (() => Element) | MutableRefObject<Element>
}

export function FullscreenButton({ target }: FullscreenProps) {
	return (
		<FullscreenButtonComponent
			size="large"
			className="rounded-none"
			target={target}
			fullscreenExitIcon={<FullscreenExitIcon />}
			fullscreenIcon={<FullscreenIcon />}
		/>
	);
}
