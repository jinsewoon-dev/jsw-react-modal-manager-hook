import { generateUniqueId } from "../lib/generateUniqueId";
import { OpenModalOptions, ModalState } from "../types";

type ModalStoreState = ModalState[];

let currentState: ModalStoreState = [];
const listeners = new Set<() => void>();

let cleanupDelay = 300; // 기본 cleanupDelay 설정

// 상태 변경을 통지
const notify = () => listeners.forEach((listener) => listener());

// 모달 스토어
export const modalStore = {
  // 상태 구독
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // 상태 가져오기
  getSnapshot: () => currentState,

  // cleanupDelay 설정
  setCleanupDelay: (delay: number) => {
    cleanupDelay = delay;
  },

  // 모달 열기
  openModal: (component: React.ReactNode, options?: OpenModalOptions) => {
    const id = generateUniqueId();
    currentState = [
      ...currentState,
      {
        id,
        component,
        isVisible: true,
        config: {
          useDim: options?.useDim ?? true,
          allowDimClickClose: options?.allowDimClickClose ?? true,
          allowBackgroundScroll: options?.allowBackgroundScroll ?? false,
        },
      },
    ];
    notify();
  },

  // 특정 또는 마지막 모달 닫기
  closeModal: (id?: string) => {
    const targetId = id || currentState[currentState.length - 1]?.id;
    if (!targetId) return;

    currentState = currentState.map((modal) =>
      modal.id === targetId ? { ...modal, isVisible: false } : modal
    );
    notify();

    setTimeout(() => {
      currentState = currentState.filter((modal) => modal.id !== targetId);
      notify();
    }, cleanupDelay);
  },

  // 모든 모달 닫기
  closeAllModals: () => {
    currentState = currentState.map((modal) => ({
      ...modal,
      isVisible: false,
    }));
    notify();

    setTimeout(() => {
      currentState = [];
      notify();
    }, cleanupDelay);
  },
};
