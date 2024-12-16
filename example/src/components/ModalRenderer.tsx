import { useModalState } from "@jsw/react-modal-manager-hook";
import { Fragment } from "react";

const ModalRenderer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <Fragment key={modal.state.id}>{modal.content}</Fragment>
  ));
};

export default ModalRenderer;
