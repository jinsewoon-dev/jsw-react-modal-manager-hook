import { Fragment } from "react/jsx-runtime";
import { useModalState } from "../hooks/useModalState";

export const ModalContainer = () => {
  const { modals } = useModalState();

  return modals.map((modal) => (
    <Fragment key={modal.state.id}>{modal.content}</Fragment>
  ));
};
