import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./routes/routes";
import { GlobalProvider } from "./context/authContext";
import "./index.css";
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
