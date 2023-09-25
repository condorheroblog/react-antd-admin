import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import { router } from "./router";
import { store } from "#src/store";
import { GlobalSpin } from "#src/components";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<StrictMode>
		<Provider store={store}>
			<GlobalSpin>
				<RouterProvider router={router} />
			</GlobalSpin>
		</Provider>
	</StrictMode>,
);
