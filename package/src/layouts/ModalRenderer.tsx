import React, { Fragment } from "react";
import { useModalState } from "../hooks/useModalState";

export const ModalRenderer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <Fragment key={modal.state.id}>
      {modal.content}
      {/* {React.cloneElement(modal.content as React.ReactElement, {
        state: {
          id: modal.state.id,
          index: modal.state.index,
        },
      })} */}
    </Fragment>
  ));
};
