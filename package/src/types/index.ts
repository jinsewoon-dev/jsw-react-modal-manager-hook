import { CSSProperties } from "react";

// export type BaseModalConfig = {
//   useDim: boolean;
//   allowDimClickClose: boolean;
//   allowBackgroundScroll: boolean;
// };

// export type ModalStateConfing = ModalProviderConfig & Partial<BaseModalConfig>;

// export type OpenModalOptions = Partial<BaseModalConfig>;
export type OpenModalConfig = {
  id?: string; // 선택적으로 ID를 명시
};
export type ModalState = {
  id: string;
  index: number;
  component: React.ReactNode;
  isVisible: boolean;
};

export type UseModalType = {
  openModal: (component: React.ReactNode, config?: OpenModalConfig) => void;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
  getModalById: (id: string) => ModalState | undefined;
  getModals: () => Map<string, ModalState>;
  cleanupModals: () => void;
};

export type ModalManagerState = ModalState[];
