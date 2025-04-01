import type { dependencies, devDependencies } from "#package.json";

import type { ThemeType } from "#src/store";
import type { GlobalToken } from "antd";

declare global {
	const __APP_INFO__: {
		pkg: {
			name: string
			version: string
			license: string
			author: string
			dependencies: typeof dependencies
			devDependencies: typeof devDependencies
		}
		lastBuildTime: string
	};

	/* Inspired by https://github.com/soybeanjs/soybean-admin/blob/v1.3.8/src/typings/global.d.ts */
	interface Window {
		/** ant design message instance */
		$message?: import("antd/es/message/interface").MessageInstance
		/** ant design modal instance */
		$modal?: Omit<import("antd/es/modal/confirm").ModalStaticFunctions, "warn">
		/** ant design notification instance */
		$notification?: import("antd/es/notification/interface").NotificationInstance
	}

	/**
	 * @description 增强 JSS 默认主题
	 * @description Enhances the default theme for JSS
	 * @see https://github.com/cssinjs/jss/blob/master/docs/react-jss-ts.md#defining-a-global-default-theme
	 */
	namespace Jss {
		/**
		 * 主题接口，包含主题相关的属性和判断
		 *
		 * @zh 主题接口，包含主题类型、全局令牌以及是否为暗色或亮色主题的判断
		 * @en Theme interface, containing theme-related properties and dark/light theme checks
		 */
		export interface Theme {
			/**
			 * 当前应用的主题类型
			 *
			 * @zh 当前应用的主题类型，可能是"dark"、"light"或空字符串
			 * @en The current theme type of the application, which can be "dark", "light", or an empty string
			 */
			theme: ThemeType

			/**
			 * antd 的 token
			 *
			 * @zh antd 样式令牌
			 * @en antd style token
			 */
			token: GlobalToken

			/**
			 * 指示当前是否为暗色主题
			 *
			 * @zh 如果当前主题为"dark"，则为true；否则为false
			 * @en Indicates whether the current theme is dark. True if the theme is "dark", otherwise false.
			 */
			isDark: boolean

			/**
			 * 指示当前是否为亮色主题
			 *
			 * @zh 如果当前主题为"light"，则为true；否则为false
			 * @en Indicates whether the current theme is light. True if the theme is "light", otherwise false.
			 */
			isLight: boolean
			/**
			 * ant design 组件的类名前缀
			 *
			 * @zh 组件的类名前缀
			 * @en Component class name prefix
			 * @default "ant"
			 */
			prefixCls: string
		}
	}
}
