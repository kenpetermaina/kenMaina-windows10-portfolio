import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./theme/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as serviceWorker from "./serviceWorker";
import "react-resizable/css/styles.css";
import { Provider } from "react-redux";
import store from "./utils/store";

initializeIcons();

// Suppress benign ResizeObserver error
const resizeObserverLoopErr = /ResizeObserver loop completed with undelivered notifications/;
const originalError = console.error;
console.error = (...args) => {
	if (args[0] && resizeObserverLoopErr.test(args[0])) {
		return;
	}
	originalError.call(console, ...args);
};

window.addEventListener('error', (e) => {
	if (resizeObserverLoopErr.test(e.message)) {
		e.stopImmediatePropagation();
	}
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

serviceWorker.register();
reportWebVitals();
