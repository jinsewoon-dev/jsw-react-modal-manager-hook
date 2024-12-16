import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalProvider } from "@jsw/react-modal-manager-hook";
// import { AnimatePresence } from "motion/react";
import ModalRenderer from "./components/ModalRenderer.tsx";

// 사용자가 정의한 타입
export type CustomModalConfig = {
  animationType?: "fade" | "slide";
  customHeader?: React.ReactNode;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <ModalRenderer />
      <App />
    </ModalProvider>
  </StrictMode>
);
