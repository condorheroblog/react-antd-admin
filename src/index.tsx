import { i18nInitOptions } from "#src/locales";
import i18n from "i18next";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { initReactI18next } from "react-i18next";
import App from "./App";
import "./styles/index.css";

import "./styles/tailwind.css";

// internationalization
i18n.use(initReactI18next).init(i18nInitOptions);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
