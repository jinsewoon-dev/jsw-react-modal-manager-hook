import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalProvider } from "@jsw/react-modal-manager-hook";
import ModalRenderer from "./components/ModalRenderer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <ModalRenderer />
      <App />
    </ModalProvider>
  </StrictMode>
);
