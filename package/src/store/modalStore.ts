// Store 생성
import { createStore } from ".";
import { TModalManager, TModalConfig } from "../model";

export const modalStore = createStore<TModalManager<TModalConfig>>({
  modal: null,
  modals: [],
  openModal(modal) {
    modalStore.setState((prev) => ({
      ...prev,
      modals: [...prev.modals, modal], // modals 배열에 새 모달 추가
    }));
  },
  closeModal() {
    modalStore.setState((prev) => ({
      ...prev,
      modals: prev.modals.slice(0, -1), // 마지막 모달 제거
    }));
  },
  delayCloseModal: () => {
    modalStore.updateState((state) => {
      if (state.modals.length === 0) return state; // 모달이 없으면 그대로 반환
      return {
        ...state,
        modals: state.modals.map((modal, index) =>
          index === state.modals.length - 1
            ? { ...modal, isVisible: false }
            : modal
        ),
      };
    });
  },
  closeAllModals() {
    modalStore.setState((prev) => ({
      ...prev,
      modals: [], // 모달 전부 제거
    }));
  },
  delayCloseAllModal: () => {
    modalStore.updateState((state) => {
      if (state.modals.length === 0) return state; // 모달이 없으면 그대로 반환
      return {
        ...state,
        modals: state.modals.map((modal) => ({
          ...modal,
          isVisible: false, // 모든 모달의 isVisible을 false로 설정
        })),
      };
    });
  },
});
