import React, { Fragment } from "react";
import { ModalManager } from "../model";
import { generateUniqueId } from "../lib/generateUniqueId";
import { useStore } from "../hooks/useStore";

export const ModalRenderer = () => {
  const modals: ModalManager["modals"] = useStore<ModalManager>(
    (state) => state.modals
  );

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
