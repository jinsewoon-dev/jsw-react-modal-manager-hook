// Store 생성
import { createStore } from ".";
import { ModalManager, TModalConfig } from "../model";

export const modalStore = createStore<ModalManager<TModalConfig>>({
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
  closeAllModal() {
    modalStore.setState((prev) => ({
      ...prev,
      modals: [], // 모달 전부 제거
    }));
  },
});
