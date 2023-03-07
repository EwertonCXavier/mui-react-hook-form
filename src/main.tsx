import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Gateways } from "./pages/Gateways";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Gateways />
  </React.StrictMode>
);
