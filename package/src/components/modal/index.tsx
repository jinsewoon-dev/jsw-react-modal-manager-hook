import React, { createContext, useContext } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalState, UseModalType } from "../../types";

type ModalProviderValue = {
  modal: ModalState;
  store: UseModalType;
};

const ModalContext = createContext<ModalProviderValue | null>(null);

type RootType = {} & React.HTMLAttributes<HTMLDivElement>;
const Root = ({ ...props }: RootType) => {
  const store = useModal();
  const modals = store.getModals();
  const targetModal = Array.from(modals).at(-1);
  const modal = targetModal![1];

  if (modal) {
    const value: ModalProviderValue = {
      modal,
      store,
    };
    return (
      <ModalContext.Provider value={value}>
        <div {...props} />
      </ModalContext.Provider>
    );
  }
};

//variant를 가져와서 쓰기위한 훅
const useValue = () => {
  const value = useContext(ModalContext);

  if (!value) {
    throw new Error(
      `[Modal Error]: Overlay,Content 컴포넌트는 Modal.Root 안에서만 사용해야 합니다.`
    );
  }

  return value;
};

type OverlayType = {
  onClick?: VoidFunction;
  allowOverlayClickClose?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">;
const Overlay = ({
  onClick,
  allowOverlayClickClose,
  ...props
}: OverlayType) => {
  const value = useValue();
  return (
    <div
      onClick={() => {
        if (allowOverlayClickClose) {
          value.store.closeModal();
          value.store.cleanupModals();
        }
        onClick && onClick();
      }}
      {...props}
    />
  );
};

type ContentType = {
  onClick?: VoidFunction;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">;
const Content = ({ onClick, ...props }: ContentType) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      {...props}
    />
  );
};

// Modal Cancel 버튼 컴포넌트
type CustomButtonProps = {
  onClick?: VoidFunction;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const Cancel: React.FC<CustomButtonProps> = ({ onClick, ...props }) => {
  const value = useValue();
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          value.store.closeModal();
          value.store.cleanupModals();
        }
      }}
      {...props}
    />
  );
};

export const Modal = {
  Root,
  Overlay,
  Content,
  Cancel,
};
