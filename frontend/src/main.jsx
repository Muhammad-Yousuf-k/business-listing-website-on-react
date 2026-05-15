import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import AppProviders from "./providers/AppProviders.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProviders>
      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="!top-16 md:!top-20"
      />
    </AppProviders>
  </BrowserRouter>
);