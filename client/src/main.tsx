import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import store from "./store/index";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <MetaMaskUIProvider sdkOptions={{
       dappMetadata: {
        name: "Referral Dapp",
       },
      }}
      >
    <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
    </MetaMaskUIProvider>
  </React.StrictMode>,
);
