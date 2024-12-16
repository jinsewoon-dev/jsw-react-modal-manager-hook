import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalProvider, ModalRenderer } from "@jsw/react-modal-manager-hook";
// import { AnimatePresence } from "motion/react";
// import ModalRenderer from "./components/ModalRenderer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      {/* <ModalRenderer /> */}
      <App />
    </ModalProvider>
  </StrictMode>
);
