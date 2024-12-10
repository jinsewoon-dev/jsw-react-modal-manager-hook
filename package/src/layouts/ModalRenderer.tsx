import React, { Fragment } from "react";
import { useStore } from "../context/ModalProvider";
import { ModalManager } from "../types";

export const ModalRenderer = () => {
  const modals: ModalManager["modals"] = useStore<ModalManager>(
    (state) => state.modals
  );
  //랜덤 아이디

  const generateUniqueId = () => {
    return crypto.randomUUID();
  };

  return modals.map((modal, index) => (
    <Fragment key={generateUniqueId()}>
      {React.cloneElement(modal.content as React.ReactElement, {
        state: {
          id: generateUniqueId(),
          index,
        },
      })}
    </Fragment>
  ));
};
