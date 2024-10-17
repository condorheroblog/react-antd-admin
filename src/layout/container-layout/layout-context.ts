import { createContext } from "react";

export const LayoutContext = createContext<{
	collapsed: boolean
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}>({
	collapsed: false,
	setCollapsed: () => { },
});
