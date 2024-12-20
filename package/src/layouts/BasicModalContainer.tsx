import { CSSProperties, useEffect } from "react";
import { useModal } from "../context/ModalProvider";
import styles from "./BasicModalContainer.module.css";
import { logError } from "../lib/logError";
import { BaseModalConfig } from "../model";

interface BasicModalContainerProps {
  initialConfig: BaseModalConfig & {
    baseZindex: number; // 필수로 변경
    dimBackgroundColor: CSSProperties["backgroundColor"];
  };
}

export const BasicModalContainer = ({
  initialConfig,
}: BasicModalContainerProps) => {
  const { modals, closeModal } = useModal();

  return (
    <>
      {modals.map((modal, index) => (
        <div
          key={modal.id}
          className={`${modal.isVisible ? styles.fadeIn : styles.fadeOut}`} // `modal.isVisible`로 애니메이션 클래스 적용
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: modal.config.useDim
              ? initialConfig.dimBackgroundColor
              : "transparent",
            zIndex: initialConfig.baseZindex + index,
            pointerEvents: modal.isVisible ? "auto" : "none", // 닫히는 동안 클릭 차단
          }}
          onClick={(e) =>
            // 오버레이 클릭 시 모달 닫기
            // modal.config.allowDimClickClose ?? initialConfig.allowDimClickClose
            //   ? closeModal()
            //   : e.preventDefault()
            closeModal(modal.id)
          }
        >
          <div
            style={{
              pointerEvents: modal.isVisible ? "auto" : "none",
            }}
            onClick={(e) => e.stopPropagation()} // 클릭 이벤트 버블링 방지
          >
            {modal.component}
          </div>
        </div>
      ))}
    </>
  );
};
