import React, { useSyncExternalStore } from "react";
import { TModalState } from "../model";
import { modalStore } from "../store/modalStore";
import { initialModalConfig } from "../config/initialConfigs";
// useModal 훅
export const useModal = () => {
  // 상태 구독
  const modals = useSyncExternalStore(
    modalStore.subscribe, // 상태 변경 구독
    modalStore.getState, // 상태 가져오기
    modalStore.getState // 서버 사이드에서 사용하는 상태 (동일하게 설정)
  ).modals;

  // 상태 조작 메서드
  const openModal = (
    content: TModalState["content"],
    config?: TModalState["config"]
  ) => {
    const modalIndex = modalStore.getState().modals.length;
    console.log({ modalIndex, config, initialModalConfig });

    const modal: TModalState = {
      content,
      config: {
        hasDim:
          config?.hasDim === undefined
            ? initialModalConfig.hasDim
            : config?.hasDim,
        canDimClickCLose:
          config?.canDimClickCLose == undefined
            ? initialModalConfig.canDimClickCLose
            : config?.canDimClickCLose,
        scrollable:
          config?.scrollable === undefined
            ? initialModalConfig.scrollable
            : config?.scrollable,
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

  return { modals, openModal, closeModal, closeAllModal };
};
