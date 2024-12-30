import { ReactNode } from "react";

export type ModalOptions = {
  useDim?: string; // 오버레이 색상, 기본값: 'rgba(0, 0, 0, 0.5)'
  allowOverlayClickClose?: boolean; // 오버레이 클릭 시 닫힘 여부
  allowBackgroundScroll?: boolean; // 백그라운드 스크롤 허용 여부
  onClose?: () => void; // 모달 닫힐 때 호출
  onExit?: () => void; // 모달 완전히 제거 시 호출
};

export type ModalItem = {
  id: string; // 고유 ID
  content: ReactNode; // 렌더할 컴포넌트
  isOpen: boolean; // 모달 열림 상태
  options: ModalOptions; // 옵션
};
