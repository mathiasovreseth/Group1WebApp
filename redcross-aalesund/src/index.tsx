import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./auth/Auth";
import {ThemeProvider} from "styled-components";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <ScrollToTop/>
        <AuthProvider>
            <App />
        </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById("root")
);
