import React, { Fragment } from "react";
// import { useModalManager } from "../hooks/useModal";
import styles from "../layouts/BasicModalContainer.module.css";
import { modalStore } from "../stores/modalStore";
import { useModalById } from "../hooks/useModalById";
import { useModalIds } from "../hooks/useModalIds";
import ModalContainer from "../layouts/ModalContainer";

type ModalProviderProps = {
  children: React.ReactNode;
  // cleanupDelay?: number;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  return (
    <>
      {children}
      <ModalContainer />
    </>
  );
};
