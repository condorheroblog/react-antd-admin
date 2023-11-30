import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import "./index.css";
import App from "./App";

import { store } from "#src/store";
import { i18nInitOptions } from "#src/locales";

// internationalization
i18n.use(initReactI18next).init(i18nInitOptions);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
