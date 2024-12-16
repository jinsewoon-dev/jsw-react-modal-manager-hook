import React, { Fragment } from "react";
import { useModalState } from "../hooks/useModalState";

export const ModalRenderer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <Fragment key={modal.state.id}>{modal.content}</Fragment>
  ));
};
