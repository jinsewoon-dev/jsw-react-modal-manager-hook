import { useSyncExternalStore } from "react";
import { TModalObject } from "../model";
import { modalStore } from "../store/modalStore";
import { generateUniqueId } from "../lib/generateUniqueId";

// useModal 훅
export const useModal = <T = {}>() => {
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
    content: TModalObject<T>["content"],
    config?: TModalObject<T>["config"]
  ) => {
    const modal: TModalObject<T> = {
      content,
      config,
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
