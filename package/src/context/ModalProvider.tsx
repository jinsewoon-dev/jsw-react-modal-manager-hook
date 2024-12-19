import React, { createContext } from "react";

import { useContext } from "react";
import {
  ModalManagerInterface,
  useModalManager,
} from "../hooks/useModalManager";
import { BasicModalContainer } from "../layouts/BasicModalContainer";

// Context 생성
const ModalContext = createContext<any>(null);

export const ModalProvider = ({
  children,
  customModalContainer,
  cleanupDelay, // 기본 delay 값을 prop으로 받음
}: {
  children: React.ReactNode;
  customModalContainer?: React.ReactNode;
  cleanupDelay?: number; // 기본값 설정
}) => {
  const { modals, openModal, closeModal, closeAllModals } = useModalManager(
    cleanupDelay ?? 300
  );

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, closeAllModals }}
    >
      {customModalContainer ?? <BasicModalContainer />}
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
