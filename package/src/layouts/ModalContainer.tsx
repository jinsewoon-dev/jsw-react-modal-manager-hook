import { Fragment } from "react/jsx-runtime";
import { useModalState } from "../hooks/useModalState";
import React from "react";
import { generateUniqueId } from "../lib/generateUniqueId";

export const ModalContainer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <Fragment key={modal.state.id}>
      {React.cloneElement(modal.content as React.ReactElement, {
        state: {
          id: generateUniqueId(),
          index: modal.state.index,
        },
      })}
    </Fragment>
  ));
};
