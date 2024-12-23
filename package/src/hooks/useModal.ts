import { modalStore } from "../stores/modalStore";

type OpenModalConfig = {
  id?: string; // 선택적으로 ID를 명시
};

export const useModal = () => {
  return {
    openModal: (component: React.ReactNode, config?: OpenModalConfig) =>
      modalStore.openModal(component, config),
    closeModal: modalStore.closeModal.bind(modalStore),
    removeModal: modalStore.removeModal.bind(modalStore),
    closeAllModals: modalStore.closeAllModals.bind(modalStore),
    removeAllModals: modalStore.removeAllModals.bind(modalStore),
    getModalById: modalStore.getModal.bind(modalStore),
  };
};
