export type TModalConfig = {
  hasDim?: boolean;
  canDimClickCLose?: boolean;
  scrollable?: boolean;
};

export type TModalState = {
  content: React.ReactNode;
  config?: TModalConfig;
};

export interface ModalManager {
  modals: TModalState[];
  addModal: (modal: TModalState) => void;
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
