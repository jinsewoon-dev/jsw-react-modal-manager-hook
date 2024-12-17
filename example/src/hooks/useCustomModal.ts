import { TModalConfig, useModal } from "@jsw/react-modal-manager-hook";

// 사용자가 정의한 타입
export type CustomModalConfig = {
  type: "modal" | "dialog";
};

export const useCustomModal = () => {
  const { lastedModal, modals, openModal, closeModal, closeAllModals } =
    useModal<TModalConfig<CustomModalConfig>>();

  return { lastedModal, modals, openModal, closeModal, closeAllModals };
};
