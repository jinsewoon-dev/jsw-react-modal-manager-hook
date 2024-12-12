import { useModalState } from "@jsw/react-modal-manager-hook";
import React, { Fragment } from "react";

const ModalRenderer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <Fragment key={modal.state.id}>
      {React.cloneElement(modal.content as React.ReactElement, {
        state: {
          id: modal.state.id,
          index: modal.state.index,
        },
      })}
    </Fragment>
  ));
};

export default ModalRenderer;
