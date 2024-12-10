import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalProvider } from "@jsw/react-modal-manager-hook";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>
);
