// Store 생성
import { createStore } from "../model/store";
import { ModalManager, TModalState } from "../types";

export const modalStore = createStore<ModalManager>({
  modals: [],
  addModal(modal: TModalState) {
    modalStore.setState((prev) => ({
      ...prev,
      modals: [...prev.modals, modal], // modals 배열에 새 모달 추가
    }));
  },
  removeModal() {
    modalStore.setState((prev) => ({
      ...prev,
      modals: prev.modals.slice(0, -1), // 마지막 모달 제거
    }));
  },
  removeAllModal() {
    modalStore.setState((prev) => ({
      ...prev,
      modals: [], // 모달 전부 제거
    }));
  },
});
