import React, { useCallback, useState, useRef, useEffect } from "react";
import { generateUniqueId } from "../lib/generateUniqueId";

interface OpenModalOptions {
  id?: string; // 모달 ID (선택적으로 지정 가능)
  onClose?: () => void; // 모달 닫힘 시 실행할 콜백
}

export type ModalState = {
  id: string; // 모달 고유 ID
  component: React.ReactNode; // 렌더링할 컴포넌트
  isVisible: boolean; // 현재 보이는 상태
  onClose?: () => void; // 닫힘 핸들러 (옵션)
};

export type ModalManagerState = ModalState[];

export interface ModalManagerInterface {
  modals: ModalManagerState;
  openModal: (
    component: ModalState["component"],
    options?: OpenModalOptions
  ) => void;
  closeModal: (id?: string | string[]) => void;
  closeAllModals: () => void;
}

/**
 * useModalManager 훅: 모달 관리 기능을 제공
 * @param cleanupDelay 모달 제거 전 지연 시간 (ms)
 * @returns 모달 상태 및 관리 함수
 */
export const useModalManager = (
  cleanupDelay: number = 0
): ModalManagerInterface => {
  const [modals, setModals] = useState<ModalManagerState>([]); // 현재 모달 상태
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({}); // 타이머 참조 저장소

  /**
   * 모달 열기
   * @param component 렌더링할 React 컴포넌트
   * @param options 모달 옵션 (ID, onClose 콜백)
   */
  const openModal = useCallback(
    (component: React.ReactNode, options?: OpenModalOptions) => {
      const id = options?.id || generateUniqueId(); // 고유 ID 생성 (또는 사용자 지정 ID 사용)
      const onClose = options?.onClose; // 닫힘 시 실행할 콜백

      // 모달 컴포넌트에 onClose를 props로 전달
      const clonedComponent = React.cloneElement(
        component as React.ReactElement,
        { onClose }
      );

      // 모달 상태 업데이트
      setModals((prev) => [
        ...prev,
        {
          id,
          component: clonedComponent,
          isVisible: true,
          onClose,
        },
      ]);
    },
    []
  );

  /**
   * 특정 모달 닫기
   * @param id 닫을 모달 ID 또는 ID 배열
   */
  const closeModal = useCallback(
    (id?: string | string[]) => {
      // 모달 닫기 애니메이션 트리거 (isVisible 변경)
      setModals((prev) => {
        if (Array.isArray(id)) {
          // ID 배열인 경우 해당 모달 비활성화
          return prev.map((modal) =>
            id.includes(modal.id) ? { ...modal, isVisible: false } : modal
          );
        }

        // 단일 ID 또는 마지막 모달 처리
        const targetId = id || prev[prev.length - 1]?.id; // 마지막 모달 ID
        if (!targetId) return prev;

        return prev.map((modal) =>
          modal.id === targetId ? { ...modal, isVisible: false } : modal
        );
      });

      // 일정 시간 후 모달 완전히 제거 (cleanupDelay 사용)
      if (Array.isArray(id)) {
        id.forEach((targetId) => {
          if (cleanupDelay > 0) {
            // cleanupDelay가 0보다 큰 경우에만 타이머 설정
            timeoutRefs.current[targetId] = setTimeout(() => {
              setModals((prev) =>
                prev.filter((modal) => modal.id !== targetId)
              );
              delete timeoutRefs.current[targetId]; // 타이머 참조 제거
            }, cleanupDelay);
          } else {
            setModals((prev) => prev.filter((modal) => modal.id !== targetId));
          }
        });
      } else {
        const targetId = id || modals[modals.length - 1]?.id;
        if (targetId) {
          if (cleanupDelay > 0) {
            timeoutRefs.current[targetId] = setTimeout(() => {
              setModals((prev) =>
                prev.filter((modal) => modal.id !== targetId)
              );
              delete timeoutRefs.current[targetId];
            }, cleanupDelay);
          } else {
            setModals((prev) => prev.filter((modal) => modal.id !== targetId));
          }
        }
      }
    },
    [modals, cleanupDelay]
  );

  /**
   * 모든 모달 닫기
   */
  const closeAllModals = useCallback(() => {
    // 모든 모달의 애니메이션 상태를 false로 설정
    setModals((prev) => prev.map((modal) => ({ ...modal, isVisible: false })));

    // 모든 모달 제거
    Object.keys(timeoutRefs.current).forEach((id) => {
      clearTimeout(timeoutRefs.current[id]); // 기존 타이머 제거
      delete timeoutRefs.current[id];
    });

    // cleanupDelay에 따라 모달 삭제 처리
    if (cleanupDelay > 0) {
      setTimeout(() => {
        setModals([]); // 모든 모달 상태 제거
      }, cleanupDelay);
    } else {
      setModals([]); // 지연 없이 즉시 제거
    }
  }, [cleanupDelay]);

  /**
   * 컴포넌트 언마운트 시 모든 타이머 정리
   */
  useEffect(() => {
    return () => {
      Object.keys(timeoutRefs.current).forEach((id) => {
        clearTimeout(timeoutRefs.current[id]);
      });
    };
  }, []);

  return { modals, openModal, closeModal, closeAllModals };
};
