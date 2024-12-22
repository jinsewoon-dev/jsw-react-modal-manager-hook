import React from "react";
import { modalStore } from "../stores/modalStore";

export const useModal = () => ({
  openModal: modalStore.openModal,
  closeModal: modalStore.closeModal,
  closeAllModals: modalStore.closeAllModals,
});

export const useModalManager = () => {
  return React.useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    modalStore.getSnapshot
  );
};
