import { useSyncExternalStore } from "react";
import { modalStore } from "../stores/modalStore";

export const useModal = () => {
  const modals = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getState,
    modalStore.getState
  );

  const openModal = (content: React.ReactNode, options = {}) => {
    const id = crypto.randomUUID();
    modalStore.setState({
      modals: [
        ...modalStore.getState().modals,
        { id, content, isOpen: true, options },
      ],
    });
  };

  const closeModal = () => {
    const modals = modalStore.getState().modals;
    if (modals.length > 0) {
      const updatedModals = modals.map((modal, index) =>
        index === modals.length - 1 ? { ...modal, isOpen: false } : modal
      );
      modalStore.setState({ modals: updatedModals });
    }
  };

  const closeAllModal = () => {
    const updatedModals = modalStore
      .getState()
      .modals.map((modal) => ({ ...modal, isOpen: false }));
    modalStore.setState({ modals: updatedModals });
  };

  const exitModal = () => {
    const updatedModals = modalStore
      .getState()
      .modals.filter((modal) => modal.isOpen);
    modalStore.setState({ modals: updatedModals });
  };

  return {
    modals: modals.modals,
    openModal,
    closeModal,
    closeAllModal,
    exitModal,
  };
};
