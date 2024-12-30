import { ModalItem } from "../types";
import { useModal } from "../hooks/useModal";
import style from "./ModalContainer.module.css";
import { useEffect } from "react";
const ModalContainer = ({ modal }: { modal: ModalItem }) => {
  const { closeModal, exitModal } = useModal();
  useEffect(() => {});
  return (
    <div
      key={modal.id}
      className={`${style.modalContent} ${
        modal.isOpen ? style.fadeIn : style.fadeOut
      }`}
      style={{
        backgroundColor: modal.options.useDim || "rgba(0, 0, 0, 0.5)",
        pointerEvents: modal.isOpen ? "auto" : "none",
      }}
      onClick={() => {
        if (modal.options.allowOverlayClickClose) {
          closeModal();
        }
      }}
      onAnimationEnd={() => {
        console.log("end");
        if (!modal.isOpen) {
          exitModal();
        }
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{modal.content}</div>
    </div>
  );
};

export default ModalContainer;
