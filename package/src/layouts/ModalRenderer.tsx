import React, { Fragment } from "react";
import { useModal } from "../hooks/useModal";

export const ModalRenderer = () => {
  const { modals } = useModal();

  return modals.map((modal, index) => (
    <Fragment key={index}>
      {React.cloneElement(modal.content as React.ReactElement, {
        modalIndex: index,
      })}
    </Fragment>
  ));
};
