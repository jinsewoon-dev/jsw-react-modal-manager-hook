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
