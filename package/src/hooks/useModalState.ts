import { ModalManager } from "../model";
import { useStore } from "./useStore";

export const useModalState = () => {
  const modals: ModalManager["modals"] = useStore<ModalManager>(
    (state) => state.modals
  );
  return { modals };
};
