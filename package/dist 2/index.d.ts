import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1, { CSSProperties } from 'react';

type ModalProviderConfig = {
    baseZindex?: number;
    dimBackgroundColor?: CSSProperties["backgroundColor"];
    cleanupDelay?: number;
};
type BaseModalConfig = {
    useDim: boolean;
    allowDimClickClose: boolean;
    allowBackgroundScroll: boolean;
};
type ModalStateConfing = ModalProviderConfig & Partial<BaseModalConfig>;
type OpenModalOptions = {
    onClose?: () => void;
} & Partial<BaseModalConfig>;
type ModalState = {
    id: string;
    component: React.ReactNode;
    isVisible: boolean;
    config: Partial<BaseModalConfig>;
    onClose?: () => void;
};
type ModalManagerState = ModalState[];
interface ModalManagerInterface {
    modals: ModalManagerState;
    openModal: (component: ModalState["component"], options?: OpenModalOptions) => void;
    closeModal: () => void;
    closeAllModals: () => void;
}

interface BasicModalContainerProps {
    initialConfig: BaseModalConfig & {
        baseZindex: number;
        dimBackgroundColor: CSSProperties["backgroundColor"];
    };
}
declare const BasicModalContainer: ({ initialConfig, }: BasicModalContainerProps) => react_jsx_runtime.JSX.Element;

type ModalProviderProps = {
    children: React$1.ReactNode;
    customModalContainer?: React$1.ReactNode;
    initialConfig?: ModalStateConfing;
};
declare const ModalProvider: ({ children, customModalContainer, initialConfig, }: ModalProviderProps) => react_jsx_runtime.JSX.Element;
declare const useModal: () => ModalManagerInterface;

export { BasicModalContainer, ModalProvider, useModal };
