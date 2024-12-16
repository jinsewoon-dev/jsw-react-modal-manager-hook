import React, { createContext } from "react";
import { Store } from "../store";
import { modalStore } from "../store/modalStore";
import { ModalRenderer } from "../layouts/ModalRenderer";

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
      {customModalContainer ?? <ModalRenderer />}
      {children}
    </ModalContext.Provider>
  );
};
