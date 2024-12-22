export const INITIAL_MODAL_CONFIG = {
  baseZindex: 10000,
  useDim: true,
  allowDimClickClose: true,
  allowBackgroundScroll: true,
  dimBackgroundColor: "rgba(0,0,0,0.5)",
  cleanupDelay: 300,
};

import React from "react";
import { useModalManager } from "../hooks/useModal";
import styles from "./BasicModalContainer.module.css";
import { modalStore } from "../stores/modalStore";

type ModalProviderProps = {
  children: React.ReactNode;
  cleanupDelay?: number;
};

export const ModalProvider = ({
  children,
  cleanupDelay = 300,
}: ModalProviderProps) => {
  const modals = useModalManager();

  // cleanupDelay 설정
  React.useEffect(() => {
    modalStore.setCleanupDelay(cleanupDelay);
  }, [cleanupDelay]);

  return (
    <>
      {children}
      {modals.map((modal, index) => (
        <div
          key={modal.id}
          className={`${modal.isVisible ? styles.fadeIn : styles.fadeOut}`}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: modal.config.useDim
              ? "rgba(0,0,0,0.5)"
              : "transparent",
            zIndex: 10000 + index,
            pointerEvents: modal.isVisible ? "auto" : "none",
          }}
          onClick={() =>
            modal.config.allowDimClickClose
              ? modalStore.closeModal(modal.id)
              : undefined
          }
        >
          <div onClick={(e) => e.stopPropagation()}>{modal.component}</div>
        </div>
      ))}
    </>
  );
};
