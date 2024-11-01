import type { MutableRefObject } from "react";

import { FullscreenButton, FullscreenExitIcon, FullscreenIcon } from "#src/components";

interface FullscreenProps {
	target: HTMLElement | (() => Element) | MutableRefObject<Element>
}

export function FullscreenMenu({ target }: FullscreenProps) {
	return (
		<FullscreenButton
			size="large"
			className="rounded-none"
			target={target}
			fullscreenExitIcon={<FullscreenExitIcon />}
			fullscreenIcon={<FullscreenIcon />}
		/>
	);
}
