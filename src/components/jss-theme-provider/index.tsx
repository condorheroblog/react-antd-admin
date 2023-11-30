import { theme } from "antd";
import type { ReactNode } from "react";
import { ThemeProvider } from "react-jss";

export interface JSSThemeProviderProps {
	children: ReactNode;
}

const { useToken } = theme;

export function JSSThemeProvider({ children }: JSSThemeProviderProps) {
	const { token } = useToken();

	return <ThemeProvider theme={token}>{children}</ThemeProvider>;
}
