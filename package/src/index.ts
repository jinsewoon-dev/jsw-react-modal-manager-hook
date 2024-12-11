export { modalStore } from "./store/modalStore";
export { Modalayout } from "./layouts/ModalLayout";
export { ModalRenderer } from "./layouts/ModalRenderer";
export { ModalProvider } from "./context/ModalProvider";
export { useModal } from "./hooks/useModal";

export {
  initialModalConfig,
  initialState,
  initialConfigValue,
} from "./config/initialConfigs";
export type {
  ModalManager,
  TModalState,
  TModalConfig,
  TModalLayoutState,
  ModalayoutProps,
} from "./model/index";
