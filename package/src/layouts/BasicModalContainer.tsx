import { useModal } from "../context/ModalProvider";
import styles from "./BasicModalContainer.module.css";

interface BasicModalContainerProps {}
export const BasicModalContainer = () => {
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
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 10000 + index,
            pointerEvents: modal.isVisible ? "auto" : "none", // 닫히는 동안 클릭 차단
          }}
          onClick={() => closeModal(modal.id)} // 오버레이 클릭 시 모달 닫기
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // 클릭 이벤트 버블링 방지
          >
            {modal.component}
          </div>
        </div>
      ))}
    </>
  );
};
