import React from "react";
import { ModalContainer } from "../layouts/ModalContainer";

type ModalProviderProps = {
  children: React.ReactNode;
  customContainer?: React.ReactNode;
};

export const ModalProvider = ({
  children,
  customContainer,
}: ModalProviderProps) => {
  return (
    <>
      {children}
      {customContainer ?? <ModalContainer />}
    </>
  );
};
