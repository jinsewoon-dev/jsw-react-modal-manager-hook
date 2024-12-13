export type TModalConfig = {
  hasDim?: boolean;
  canDimClickClose?: boolean;
  scrollable?: boolean;
};

export type TModalObject = {
  content: React.ReactNode;
  config?: TModalConfig;
  state: TModalLayoutState;
};
/**삭제예정 */
export type TModalState = {
  content: React.ReactNode;
  config?: TModalConfig;
};

export interface ModalManager {
  modals: TModalObject[];
  addModal: (modal: TModalObject) => void;
  removeModal: () => void;
  removeAllModal: () => void;
}

export type TModalLayoutState = {
  id: string;
  index: number;
};

export type TModalDefaultConfig = {
  baseZindex: number;
  customDimColor?: React.CSSProperties["backgroundColor"];
  className?: string;
  initialStyle?: React.CSSProperties;
} & Required<TModalConfig>;

export interface ModalayoutProps {
  children?: React.ReactNode;
  state?: TModalLayoutState;
  defaultConfig: TModalDefaultConfig;
}
