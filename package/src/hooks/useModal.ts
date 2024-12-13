import { useSyncExternalStore } from "react";
import { TModalObject } from "../model";
import { modalStore } from "../store/modalStore";
import { generateUniqueId } from "../lib/generateUniqueId";

// useModal 훅
export const useModal = () => {
  // 상태 구독
  const modals = useSyncExternalStore(
    modalStore.subscribe, // 상태 변경 구독
    modalStore.getState, // 상태 가져오기
    modalStore.getState // 서버 사이드에서 사용하는 상태 (동일하게 설정)
  ).modals;

  const modalIndex = modalStore.getState().modals.length;
  const modal = modalStore.getState().modals[modalIndex];

  // 상태 조작 메서드
  const openModal = (
    content: TModalObject["content"],
    config?: TModalObject["config"]
  ) => {
    const modal: TModalObject = {
      content,
      config: {
        canDimClickClose: config?.canDimClickClose ?? undefined,
        scrollable: config?.scrollable ?? undefined,
        hasDim: config?.hasDim ?? undefined,
      },
      state: {
        id: generateUniqueId(),
        index: modalStore.getState().modals.length,
      },
    };
    modalStore.getState().addModal(modal);
  };

  const closeModal = () => {
    modalStore.getState().removeModal();
  };

  const closeAllModal = () => {
    modalStore.getState().removeAllModal();
  };

  return { modal, modals, openModal, closeModal, closeAllModal };
};
