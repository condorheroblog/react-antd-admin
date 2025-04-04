import { TanstackQuery } from "#src/components";
import { setupI18n } from "#src/locales";
import { setupLoading } from "#src/plugins";

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import "./styles/index.css";

async function setupApp() {
	/**
	 * @zh 初始化国际化，必须放在第一位，loading 中引用了国际化
	 * @en Initialize internationalization, must be placed first. Loading refer to internationalization
	 */
	setupI18n();

	// App Loading
	setupLoading();

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
