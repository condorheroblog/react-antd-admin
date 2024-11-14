import type { FullscreenButtonProps } from "#src/components";

import { FullscreenButton as FullscreenButtonComponent, FullscreenExitIcon, FullscreenIcon } from "#src/components";

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
