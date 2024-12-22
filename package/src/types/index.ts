import { CSSProperties } from "react";

export type ModalProviderConfig = {
  baseZindex?: number;
  dimBackgroundColor?: CSSProperties["backgroundColor"];
  cleanupDelay?: number; // 기본값 설정
};

export type BaseModalConfig = {
  useDim: boolean;
  allowDimClickClose: boolean;
  allowBackgroundScroll: boolean;
};

export type ModalStateConfing = ModalProviderConfig & Partial<BaseModalConfig>;

export type OpenModalOptions = Partial<BaseModalConfig>;

export type ModalState = {
  id: string; // 모달 고유 ID
  component: React.ReactNode; // 렌더링할 컴포넌트
  isVisible: boolean; // 현재 보이는 상태
  config: Partial<BaseModalConfig>;
  onClose?: () => void; // 닫힘 핸들러 (옵션)
};

export type ModalManagerState = ModalState[];

export interface ModalManagerInterface {
  modals: ModalManagerState;
  openModal: (
    component: ModalState["component"],
    options?: OpenModalOptions
  ) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}
