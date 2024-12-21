import React, { createContext, CSSProperties } from "react";

import { useContext } from "react";
import { useModalManager } from "../hooks/useModalManager";
import { BasicModalContainer } from "../layouts/BasicModalContainer";
import { ModalManagerInterface, ModalStateConfing } from "../types";

// Context 생성
const ModalContext = createContext<any>(null);
export type ModalProviderProps = {
  children: React.ReactNode;
  customModalContainer?: React.ReactNode;
  initialConfig?: ModalStateConfing;
};
export const INITIAL_MODAL_CONFIG = {
  baseZindex: 10000,
  useDim: true,
  allowDimClickClose: true,
  allowBackgroundScroll: true,
  dimBackgroundColor: "rgba(0,0,0,0.5)",
  cleanupDelay: 300,
};

export const ModalProvider = ({
  children,
  customModalContainer,
  initialConfig = INITIAL_MODAL_CONFIG,
}: ModalProviderProps) => {
  const { modals, openModal, closeModal, closeAllModals } = useModalManager(
    initialConfig.cleanupDelay ?? INITIAL_MODAL_CONFIG.cleanupDelay
  );

  console.log({ cleanupDelay: initialConfig.cleanupDelay });
  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, closeAllModals }}
    >
      {customModalContainer ?? (
        <BasicModalContainer
          initialConfig={{
            useDim: initialConfig.useDim ?? INITIAL_MODAL_CONFIG.useDim,
            allowDimClickClose:
              initialConfig.allowDimClickClose ??
              INITIAL_MODAL_CONFIG.allowDimClickClose,
            allowBackgroundScroll:
              initialConfig.allowBackgroundScroll ??
              INITIAL_MODAL_CONFIG.allowBackgroundScroll,
            dimBackgroundColor:
              initialConfig.dimBackgroundColor ??
              INITIAL_MODAL_CONFIG.dimBackgroundColor,
            baseZindex:
              initialConfig.baseZindex ?? INITIAL_MODAL_CONFIG.baseZindex,
          }}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

// Context를 쉽게 사용할 수 있는 커스텀 훅
export const useModal = () => {
  const context = useContext(ModalContext) as ModalManagerInterface;
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
