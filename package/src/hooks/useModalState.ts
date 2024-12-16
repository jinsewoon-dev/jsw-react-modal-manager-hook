import { ModalManager, TModalConfig } from "../model";
import { useStore } from "./useStore";

export const useModalState = () => {
  const modals: ModalManager["modals"] = useStore<ModalManager<TModalConfig>>(
    (state) => state.modals
  );
  return { modals };
};
