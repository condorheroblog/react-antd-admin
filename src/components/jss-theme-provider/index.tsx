import type { ReactNode } from "react";

import { usePreferences } from "#src/hooks";

import { ConfigProvider, theme } from "antd";
import { useContext } from "react";
import { ThemeProvider } from "react-jss";

/**
 * 自定义的JSS主题提供者组件
 *
 * @zh 自定义的 JSS 主题提供者组件，用于在 React 应用中提供 JSS 主题
 * @en Custom JSS theme provider component, used to provide JSS themes in React applications
 */
export interface JSSThemeProviderProps {
	/**
	 * 子组件
	 *
	 * @zh 子组件，该组件将接收JSS主题
	 * @en Children components, which will receive the JSS theme
	 */
	children: ReactNode
}

const { useToken } = theme;

/**
 * JSSThemeProvider 组件
 *
 * @zh JSSThemeProvider 组件，用于将 Ant Design 的 token 和全局主题状态传递给子组件
 * @en JSSThemeProvider component, used to pass Ant Design tokens and global theme state to child components
 *
 * @param {JSSThemeProviderProps} props 组件属性
 * @returns {JSX.Element} 返回的JSX元素
 */
export function JSSThemeProvider({ children }: JSSThemeProviderProps) {
	const antdContext = useContext(ConfigProvider.ConfigContext);
	const prefixCls = antdContext.getPrefixCls();
	const { token } = useToken();
	const { theme, isDark, isLight } = usePreferences();

	return (
		<ThemeProvider theme={{ token, theme, isDark, isLight, prefixCls }}>
			{children}
		</ThemeProvider>
	);
}
