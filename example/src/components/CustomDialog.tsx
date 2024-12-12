// import { Modalayout } from "@jsw/react-modal-manager-hook";

import ModalLayout from "../layouts/ModalLayout";

interface CustomDialogProps {
  children: React.ReactNode;
}
const CustomDialog = ({ children }: CustomDialogProps) => {
  return (
    <ModalLayout
      defaultConfig={{
        customDimColor: "rgba(0,0,0,0.5)",
        baseZindex: 20000,
        scrollable: false,
        canDimClickClose: false,
        hasDim: true,
      }}
    >
      {children}
    </ModalLayout>
  );
};

export default CustomDialog;
