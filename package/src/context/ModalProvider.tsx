import React, { createContext } from "react";

import { Store } from "../store";
import { modalStore } from "../store/modalStore";

export const ModalContext = createContext<Store<any> | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContext.Provider value={modalStore}>{children}</ModalContext.Provider>
  );
};
