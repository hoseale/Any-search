import React from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./app";
const root = createRoot(document.getElementById("app"));
root.render(
  <ConfigProvider theme={{}}>
    <App />
  </ConfigProvider>
);
