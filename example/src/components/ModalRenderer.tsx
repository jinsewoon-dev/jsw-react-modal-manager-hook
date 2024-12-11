import { useModalState } from "@jsw/react-modal-manager-hook";
import { Fragment } from "react/jsx-runtime";

const ModalRenderer = () => {
  const { modals } = useModalState();
  return (
    <>
      {modals.map((modal) => {
        return <Fragment key={modal.state.id}>{modal.content}</Fragment>;
      })}
    </>
  );
};

export default ModalRenderer;
