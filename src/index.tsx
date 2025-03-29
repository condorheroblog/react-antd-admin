import { TanstackQuery } from "#src/components";
import { setupI18n } from "#src/locales";
import { setupLoading } from "#src/plugins";
import { setupRouter } from "#src/router";

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import "./styles/index.css";

async function setupApp() {
	/**
	 * @zh 初始化国际化，必须放在第一位，loading 和 路由都引用了国际化
	 * @en Initialize internationalization, must be placed first. Loading and routing both refer to internationalization
	*/
	setupI18n();

	// App Loading
	setupLoading();

	/* setupRouter 使用了 setupI18n，所以必须放在 setupI18n 后面 */
	await setupRouter();

	const rootElement = document.getElementById("root");
	if (!rootElement)
		return;
	const root = createRoot(
		rootElement,
	);

	root.render(
		// <StrictMode>
		<TanstackQuery>
			<App />
		</TanstackQuery>,
		// </StrictMode>,
	);
}

setupApp();
