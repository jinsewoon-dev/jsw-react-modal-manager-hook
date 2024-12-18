import { useSyncExternalStore } from "react";
import { TModalObject } from "../model";
import { modalStore } from "../store/modalStore";
import { generateUniqueId } from "../lib/generateUniqueId";

// useModal 훅
export const useModal = <T extends {} = {}>({
  cleanupDelay,
}: {
  cleanupDelay?: number;
} = {}) => {
  // 상태 구독
  const modals = useSyncExternalStore(
    modalStore.subscribe, // 상태 변경 구독
    modalStore.getState, // 상태 가져오기
    modalStore.getState // 서버 사이드에서 사용하는 상태 (동일하게 설정)
  ).modals as TModalObject<T>[]; // 제네릭 타입 반영;
  const modalIndex = modals.length;
  const lastedModal = modals[modalIndex - 1] as TModalObject<T>;
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
      isVisible: true,
    };

    modalStore.getState().openModal(modal);
  };

  const cleanupModals = (func: VoidFunction) => {
    const delay = setTimeout(func, cleanupDelay);
    return () => clearTimeout(delay);
  };

  const closeModal = () => {
    if (cleanupDelay) {
      cleanupModals(() => modalStore.getState().closeModal());
      modalStore.getState().delayCloseModal();
    } else {
      modalStore.getState().closeModal();
    }
  };

  const closeAllModals = () => {
    if (cleanupDelay) {
      cleanupModals(() => modalStore.getState().closeAllModals());
      modalStore.getState().delayCloseAllModal();
    } else {
      modalStore.getState().closeAllModals();
    }
  };

  return { lastedModal, modals, openModal, closeModal, closeAllModals };
};
