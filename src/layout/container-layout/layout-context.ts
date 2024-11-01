import { createContext } from "react";

export const LayoutContext = createContext<{
	sidebarCollapsed: boolean
	setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}>({
	sidebarCollapsed: false,
	setSidebarCollapsed: () => { },
});
