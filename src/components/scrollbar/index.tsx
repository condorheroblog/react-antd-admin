import { cn } from "#src/utils";

import { forwardRef } from "react";
import SimpleBar, { type Props as SimplebarProps } from "simplebar-react";

/**
 * @see https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react
 */
export const Scrollbar = forwardRef<HTMLElement, SimplebarProps>(({ children, ...other }, ref) => {
	return (
		<SimpleBar
			autoHide={true}
			scrollableNodeProps={{ ref }}
			clickOnTrack={false}
			{...other}
			className={cn("h-full", other.className)}
		>
			{children}
		</SimpleBar>
	);
});
