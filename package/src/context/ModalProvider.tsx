import React, { createContext, CSSProperties } from "react";
import { Store } from "../store";
import { modalStore } from "../store/modalStore";
import { ModalContainer } from "../layouts/ModalContainer";

export const ModalContext = createContext<Store<any> | null>(null);

export const ModalProvider = ({
  children,
  customModalContainer,
}: {
  children: React.ReactNode;
  customModalContainer?: React.ReactNode;
}) => {
  return (
    <ModalContext.Provider value={modalStore}>
      {customModalContainer ?? <ModalContainer />}
      {children}
    </ModalContext.Provider>
  );
};
