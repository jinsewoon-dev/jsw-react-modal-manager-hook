import { Fragment } from "react";
import { useModalState } from "../hooks/useModalState";

export const ModalRenderer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <div style={{ zIndex: 10000, position: "relative" }} key={modal.state.id}>
      {modal.content}
    </div>
  ));
};
