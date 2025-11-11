import type { FullscreenButtonProps } from "#src/components/fullscreen-button";

import { FullscreenButton as FullscreenButtonComponent } from "#src/components/fullscreen-button";
import { RiFullscreenExitLine, RiFullscreenLine } from "#src/icons";

export function FullscreenButton({ target, ...restProps }: FullscreenButtonProps) {
	return (
		<FullscreenButtonComponent
			{...restProps}
			target={target}
			fullscreenExitIcon={<RiFullscreenExitLine />}
			fullscreenIcon={<RiFullscreenLine />}
		/>
	);
}
