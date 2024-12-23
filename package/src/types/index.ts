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
  id: string; // 모달 고유 ID
  component: React.ReactNode; // 렌더링할 컴포넌트
  isVisible: boolean; // 현재 보이는 상태
};

export type ModalManagerState = ModalState[];
