import React from "react";
import { useModal } from "../hooks/useModal";
import ModalContainer from "../layouts/ModalContainer";

interface ModalProviderProps {
  children: React.ReactNode;
  customModalContainer?: React.ReactNode;
}
export const ModalProvider = ({
  children,
  customModalContainer,
}: ModalProviderProps) => {
  const { modals } = useModal();
  return (
    <div>
      {children}
      {customModalContainer ??
        modals.map((modal) => <ModalContainer key={modal.id} modal={modal} />)}
    </div>
  );
};
