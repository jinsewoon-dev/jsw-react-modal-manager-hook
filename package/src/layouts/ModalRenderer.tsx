import React, { Fragment } from "react";
import { useModalState } from "../hooks/useModalState";

export const ModalRenderer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <Fragment key={modal.state.id}>
      {React.cloneElement(modal.content as React.ReactElement, {
        state: {
          id: modal.state.id,
          index: modal.state.index,
          isVisible: true,
        },
      })}
    </Fragment>
  ));
};

// export const ModalRenderer = () => {
//   const modals: ModalManager["modals"] = useStore<ModalManager>(
//     (state) => state.modals
//   );

//   return modals.map((modal, index) => (
//     <Fragment key={generateUniqueId()}>
//       {React.cloneElement(modal.content as React.ReactElement, {
//         state: {
//           id: generateUniqueId(),
//           index,
//         },
//       })}
//     </Fragment>
//   ));
// };
