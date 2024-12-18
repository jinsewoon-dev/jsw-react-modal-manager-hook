// import { Modalayout } from "@jsw/react-modal-manager-hook";

import ModalLayout from "../layouts/ModalLayout";
import { TModalLayoutState } from "@jsw/react-modal-manager-hook";
interface CustomDialogProps {
  children: React.ReactNode;
  state?: TModalLayoutState;
}
const CustomDialog = ({ children, state }: CustomDialogProps) => {
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

export default CustomDialog;
