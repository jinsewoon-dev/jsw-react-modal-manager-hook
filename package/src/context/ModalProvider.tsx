import React, { createContext, useContext, useSyncExternalStore } from "react";
import { ModalRenderer } from "../layouts/ModalRenderer";
import { Store } from "../store";
import { modalStore } from "../store/modalStore";

export const ModalContext = createContext<Store<any> | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContext.Provider value={modalStore}>
      <ModalRenderer />
      {children}
    </ModalContext.Provider>
  );
};
