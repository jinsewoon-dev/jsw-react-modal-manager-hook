// Store 생성
import { createStore } from ".";
import { ModalManager, TModalObject } from "../model";

export const modalStore = createStore<ModalManager>({
  modals: [],
  addModal(modal: TModalObject) {
    modalStore.setState((prev) => ({
      ...prev,
      modals: [...prev.modals, modal], // modals 배열에 새 모달 추가
    }));
  },
  // removeModal() {
  //   modalStore.setState((prev) => ({
  //     ...prev,
  //     modals: prev.modals.slice(0, -1), // 마지막 모달 제거
  //   }));
  // },
  // removeAllModal() {
  //   modalStore.setState((prev) => ({
  //     ...prev,
  //     modals: [], // 모달 전부 제거
  //   }));
  // },
  removeModal() {
    modalStore.setState((prev) => {
      // 마지막 모달의 isVisible을 false로 설정
      const updatedModals = prev.modals.map((modal, index) =>
        index === prev.modals.length - 1
          ? {
              ...modal,
              state: {
                id: modal.state.id,
                index: modal.state.index,
                isVisible: false,
              },
            }
          : modal
      );

      return { ...prev, modals: updatedModals };
    });
  },
  removeAllModal() {
    modalStore.setState((prev) => ({
      ...prev,
      modals: prev.modals.map((modal) => ({
        ...modal,
        state: {
          ...modal.state,
          isVisible: false,
        },
      })),
    }));
  },

  cleanupModals() {
    modalStore.setState((prev) => ({
      ...prev,
      modals: prev.modals.filter((modal) => modal.state.isVisible),
    }));
  },
});
