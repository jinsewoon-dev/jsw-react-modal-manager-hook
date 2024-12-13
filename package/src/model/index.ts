// 라이브러리 내부: 기본 설정
export type TBaseModalConfig = {
  useDim?: boolean;
  allowDimClickClose?: boolean;
  allowBackgroundScroll?: boolean;
};

// 제네릭으로 사용자 정의 확장 가능
export type TModalConfig<T = {}> = TBaseModalConfig & T;

export type TModalLayoutState = {
  id: string;
  index: number;
};
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
  openModal: (modal: TModalObject<T>) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

export type TModalDefaultConfig<T> = {
  baseZindex?: number;
  customDimColor?: React.CSSProperties["backgroundColor"];
  className?: string;
  initialStyle?: React.CSSProperties;
} & Required<TModalConfig<T>>;

export interface ModalayoutProps<T> {
  children?: React.ReactNode;
  defaultConfig?: TModalDefaultConfig<T>;
}
