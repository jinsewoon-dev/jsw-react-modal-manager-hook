import React, { useCallback, useState, useRef, useEffect } from "react";
import { generateUniqueId } from "../lib/generateUniqueId";
import {
  ModalManagerInterface,
  ModalManagerState,
  OpenModalOptions,
} from "../types";
import { INITIAL_MODAL_CONFIG } from "../context/ModalProvider";

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
      const id = generateUniqueId();
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
          config: {
            useDim: options?.useDim ?? INITIAL_MODAL_CONFIG.useDim,
            allowDimClickClose:
              options?.allowDimClickClose ??
              INITIAL_MODAL_CONFIG.allowDimClickClose,
            allowBackgroundScroll:
              options?.allowBackgroundScroll ??
              INITIAL_MODAL_CONFIG.allowBackgroundScroll,
          },
          onClose,
        },
      ]);
    },
    []
  );

  /**
   * 마지막 모달 닫기
   */
  const closeModal = useCallback(() => {
    setModals((prev) => {
      if (prev.length === 0) return prev; // 닫을 모달이 없으면 종료

      // 마지막 모달을 닫기
      const updatedModals = prev.map((modal, index) => {
        if (index === prev.length - 1) {
          return { ...modal, isVisible: false };
        }
        return modal;
      });

      // cleanupDelay에 따라 DOM에서 모달 제거
      if (cleanupDelay > 0) {
        const lastModalId = prev[prev.length - 1]?.id;
        if (lastModalId) {
          timeoutRefs.current[lastModalId] = setTimeout(() => {
            setModals((current) =>
              current.filter((modal) => modal.id !== lastModalId)
            );
            delete timeoutRefs.current[lastModalId];
          }, cleanupDelay);
        }
      } else {
        // 즉시 DOM에서 제거
        return updatedModals.filter(
          (_, index) => index !== updatedModals.length - 1
        );
      }

      return updatedModals;
    });
  }, [cleanupDelay]);

  /**
   * 모든 모달 닫기
   */
  const closeAllModals = useCallback(() => {
    setModals((prev) => prev.map((modal) => ({ ...modal, isVisible: false })));

    // cleanupDelay에 따라 모든 모달 제거
    if (cleanupDelay > 0) {
      setTimeout(() => {
        setModals([]); // 모든 모달 상태 제거
      }, cleanupDelay);
    } else {
      setModals([]); // 즉시 제거
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
