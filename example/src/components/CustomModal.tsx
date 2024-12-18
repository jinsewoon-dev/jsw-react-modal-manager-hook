// import { Modalayout } from "@jsw/react-modal-manager-hook";
import { PropsWithChildren } from "react";
import ModalLayout from "../layouts/ModalLayout";
import { TModalLayoutState } from "@jsw/react-modal-manager-hook";
interface CustomModalProps {
  children: React.ReactNode;
  state?: TModalLayoutState;
}
const CustomModal = ({ children, state }: CustomModalProps) => {
  return (
    <ModalLayout
      state={state!}
      defaultConfig={{
        useDim: true,
        allowDimClickClose: true,
        allowBackgroundScroll: false,
        type: "modal",
        cleanupDelay: 300,
      }}
    >
      {children}
    </ModalLayout>
  );
};

export default CustomModal;
