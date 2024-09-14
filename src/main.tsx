import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";

const App = lazy(() => import("./App"));

const rootNode = document.getElementById("root");

if (!rootNode) {
  throw new Error("Root is not found");
}

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
