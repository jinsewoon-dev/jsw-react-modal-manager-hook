export { modalStore } from "./stores";
export { Modalayout } from "./layouts/ModalLayout";
export { ModalRenderer } from "./layouts/ModalRenderer";
export { ModalProvider } from "./context/ModalProvider";
export { useModal } from "./hooks/useModal";

export {
  initialModalConfig,
  initialState,
  initialConfigValue,
} from "./lib/constant";
export type {
  ModalManager,
  TModalState,
  TModalConfig,
  TModalLayoutState,
  ModalayoutProps,
} from "./types/index";
