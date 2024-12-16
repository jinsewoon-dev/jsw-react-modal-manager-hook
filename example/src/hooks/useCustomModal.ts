import { useModal } from "@jsw/react-modal-manager-hook";
import { CustomModalConfig } from "../main";

export const useCustomModal = () => {
  const { modal, modals, openModal, closeModal, closeAllModal } =
    useModal<CustomModalConfig>();

  return { modal, modals, openModal, closeModal, closeAllModal };
};
