import React from "react";
import ModalContainer from "../layouts/ModalContainer";

type ModalProviderProps = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  return (
    <>
      {children}
      <ModalContainer />
    </>
  );
};
