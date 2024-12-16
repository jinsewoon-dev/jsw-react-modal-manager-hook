// 라이브러리 내부: 기본 설정
export type BaseModalConfig = {
  useDim?: boolean;
  allowDimClickClose?: boolean;
  allowBackgroundScroll?: boolean;
};

// 제네릭으로 사용자 정의 확장 가능
export type TModalConfig<T = {}> = BaseModalConfig & T;

export type TModalObject<T = {}> = {
  content: React.ReactNode;
  config?: TModalConfig<T>;
  state: TModalLayoutState;
};
/**삭제예정 */
export type TModalState = {
  content: React.ReactNode;
  config?: TModalConfig;
};

export interface ModalManager<T = {}> {
  modals: TModalObject<T>[];
  addModal: (modal: TModalObject<T>) => void;
  removeModal: () => void;
  removeAllModal: () => void;
}

export type TModalLayoutState = {
  id: string;
  index: number;
};
