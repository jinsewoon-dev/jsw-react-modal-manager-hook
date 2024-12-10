import { useModal } from "@jsw/react-modal-manager-hook";
import { useRef } from "react";

type ModalProps = {
  children?: React.ReactNode;
  modalIndex?: number; // modalIndex를 props로 받음
};

const Modal = ({ modalIndex = 0, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { modals, closeModal } = useModal();
  const currentModal = modals[modalIndex];

  return (
    <div
      ref={ref}
      onClick={() =>
        currentModal.config?.canDimClickCLose ? closeModal() : null
      }
      style={{
        zIndex: 1000 + modalIndex,
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: currentModal.config?.hasDim
          ? "rgba(0,0,0,0.5)"
          : "transparent",
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
