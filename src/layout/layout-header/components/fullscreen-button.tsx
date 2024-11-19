import type { FullscreenButtonProps } from "#src/components";

import { FullscreenButton as FullscreenButtonComponent } from "#src/components";
import { FullscreenExitIcon, FullscreenIcon } from "#src/icons";

export function FullscreenButton({ target, ...restProps }: FullscreenButtonProps) {
	return (
		<FullscreenButtonComponent
			{...restProps}
			target={target}
			fullscreenExitIcon={<FullscreenExitIcon />}
			fullscreenIcon={<FullscreenIcon />}
		/>
	);
}
