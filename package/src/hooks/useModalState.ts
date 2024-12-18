import { TModalManager, TModalConfig } from "../model";
import { useStore } from "./useStore";

export const useModalState = () => {
  const modals: TModalManager["modals"] = useStore<TModalManager<TModalConfig>>(
    (state) => state.modals
  );
  return { modals };
};
