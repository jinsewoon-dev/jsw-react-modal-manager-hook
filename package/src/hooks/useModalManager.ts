// /**
//  * useModalManager 훅: 모달 관리 기능을 제공
//  * @param cleanupDelay 모달 제거 전 지연 시간 (ms)
//  * @returns 모달 상태 및 관리 함수
//  */
// export const useModalManager = (
//   cleanupDelay: number = 0
// ): ModalManagerInterface => {
//   const [modals, setModals] = useState<ModalManagerState>([]); // 현재 모달 상태
//   const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({}); // 타이머 참조 저장소

//   /**
//    * 모달 열기
//    * @param component 렌더링할 React 컴포넌트
//    * @param options 모달 옵션 (ID, onClose 콜백)
//    */

//   const openModal = useCallback(
//     (component: React.ReactNode, options?: OpenModalOptions) => {
//       const id = options?.id || generateUniqueId(); // 고유 ID 생성 (또는 사용자 지정 ID 사용)
//       const onClose = options?.onClose; // 닫힘 시 실행할 콜백

//       // 모달 컴포넌트에 onClose를 props로 전달
//       const clonedComponent = React.cloneElement(
//         component as React.ReactElement,
//         { onClose }
//       );

//       // 모달 상태 업데이트
//       setModals((prev) => [
//         ...prev,
//         {
//           id,
//           component: clonedComponent,
//           isVisible: true,
//           config: {
//             useDim: options?.useDim ?? INITIAL_MODAL_CONFIG.useDim,
//             allowDimClickClose:
//               options?.allowDimClickClose ??
//               INITIAL_MODAL_CONFIG.allowDimClickClose,
//             allowBackgroundScroll:
//               options?.allowBackgroundScroll ??
//               INITIAL_MODAL_CONFIG.allowBackgroundScroll,
//           },
//           onClose,
//         },
//       ]);
//     },
//     []
//   );

//   /**
//    * 특정 모달 닫기
//    * @param id 닫을 모달 ID 또는 ID 배열
//    */
//   const closeModal = useCallback(
//     (id?: string | string[]) => {
//       // 특정 ID의 모달을 닫고 DOM에서 제거
//       const closeModalsById = (targetIds: string[]) => {
//         // 1. `isVisible`을 false로 설정 (애니메이션 트리거)
//         setModals((prev) =>
//           prev.map((modal) =>
//             targetIds.includes(modal.id)
//               ? { ...modal, isVisible: false }
//               : modal
//           )
//         );

//         // 2. 애니메이션 종료 후 DOM에서 제거
//         if (cleanupDelay > 0) {
//           targetIds.forEach((targetId) => {
//             timeoutRefs.current[targetId] = setTimeout(() => {
//               setModals((prev) =>
//                 prev.filter((modal) => modal.id !== targetId)
//               );
//               delete timeoutRefs.current[targetId]; // 타이머 참조 제거
//             }, cleanupDelay);
//           });
//         } else {
//           // 즉시 DOM에서 제거
//           setModals((prev) =>
//             prev.filter((modal) => !targetIds.includes(modal.id))
//           );
//         }
//       };

//       if (Array.isArray(id)) {
//         // ID가 배열일 경우, 해당 배열의 모든 모달 닫기
//         closeModalsById(id);
//       } else {
//         // 단일 ID 또는 마지막 모달 처리
//         const targetId = id || modals[modals.length - 1]?.id; // 마지막 모달의 ID를 기본값으로 설정
//         console.log(
//           "targetId",
//           id,
//           modals[modals.length - 1],
//           modals[modals.length - 1]?.id
//         );
//         if (!targetId) return; // 닫을 모달이 없으면 종료
//         closeModalsById([targetId]);
//       }
//     },
//     [modals, cleanupDelay]
//   );

//   /**
//    * 모든 모달 닫기
//    */
//   const closeAllModals = useCallback(() => {
//     // 모든 모달의 애니메이션 상태를 false로 설정
//     setModals((prev) => prev.map((modal) => ({ ...modal, isVisible: false })));

//     // 모든 모달 제거
//     Object.keys(timeoutRefs.current).forEach((id) => {
//       clearTimeout(timeoutRefs.current[id]); // 기존 타이머 제거
//       delete timeoutRefs.current[id];
//     });

//     // cleanupDelay에 따라 모달 삭제 처리
//     if (cleanupDelay > 0) {
//       setTimeout(() => {
//         setModals([]); // 모든 모달 상태 제거
//       }, cleanupDelay);
//     } else {
//       setModals([]); // 지연 없이 즉시 제거
//     }
//   }, [cleanupDelay]);

//   /**
//    * 컴포넌트 언마운트 시 모든 타이머 정리
//    */
//   useEffect(() => {
//     return () => {
//       Object.keys(timeoutRefs.current).forEach((id) => {
//         clearTimeout(timeoutRefs.current[id]);
//       });
//     };
//   }, []);

//   return { modals, openModal, closeModal, closeAllModals };
// };

import React, { useCallback, useState, useRef, useEffect } from "react";
import { generateUniqueId } from "../lib/generateUniqueId";
import {
  ModalManagerInterface,
  ModalManagerState,
  OpenModalOptions,
} from "../model";
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
