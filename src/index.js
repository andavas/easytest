import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./routes/routes";
import { AuthProvider } from "./context/authContext";
import "./index.css";
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
