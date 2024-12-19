import { useState } from "react";
import { useModal } from "../context/ModalProvider";
import styles from "./BasicModalContainer.module.css";

interface BasicModalContainerProps {
  fadeInClass?: string; // fade-in 애니메이션 클래스
  fadeOutClass?: string; // fade-out 애니메이션 클래스
  onAnimationStart?: (id: string) => void; // 애니메이션 시작 시 호출
  onAnimationEnd?: (id: string) => void; // 애니메이션 종료 시 호출
}

export const BasicModalContainer: React.FC<BasicModalContainerProps> = ({
  // fadeInClass , // 기본 fade-in 클래스
  // fadeOutClass, // 기본 fade-out 클래스
  fadeInClass = styles.fadeIn, // 기본 fade-in 클래스
  fadeOutClass = styles.fadeOut, // 기본 fade-out 클래스
  onAnimationStart,
  onAnimationEnd,
}) => {
  const { modals, closeModal } = useModal();
  const [closingModals, setClosingModals] = useState<Set<string>>(new Set()); // 닫히는 모달 ID 추적

  const handleAnimationEnd = (id: string) => {
    if (closingModals.has(id)) {
      setClosingModals((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
      closeModal(id); // 애니메이션 종료 후 모달 닫기
    }
    if (onAnimationEnd) onAnimationEnd(id); // 사용자 정의 애니메이션 종료 콜백 호출
  };

  const handleOverlayClick = (id: string) => {
    setClosingModals((prev) => new Set(prev).add(id)); // 닫히는 모달 ID 추가
  };

  return (
    <>
      {modals.map((modal, index) => {
        const isClosing = closingModals.has(modal.id); // 현재 닫히는 상태인지 확인
        // console.log({ isClosing });
        return (
          <div
            key={modal.id}
            className={`${
              isClosing
                ? // modal.isVisible
                  fadeInClass
                : fadeOutClass
            } `} // 애니메이션 클래스 적용
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 10000 + index,
            }}
            onClick={() => handleOverlayClick(modal.id)} // 오버레이 클릭 처리
            onAnimationStart={() => onAnimationStart?.(modal.id)} // 애니메이션 시작 콜백
            onAnimationEnd={() => handleAnimationEnd(modal.id)} // 애니메이션 종료 콜백
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} // 클릭 이벤트 버블링 방지
            >
              {modal.component}
            </div>
          </div>
        );
      })}
    </>
  );
};
