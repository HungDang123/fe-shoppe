import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "antd/es/alert/ErrorBoundary.js";
import { UserProvider } from "./context/userContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
