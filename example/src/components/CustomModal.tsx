// import { Modalayout } from "@jsw/react-modal-manager-hook";
import { PropsWithChildren } from "react";
import ModalLayout from "../layouts/ModalLayout";

const CustomModal = ({ children }: PropsWithChildren) => {
  return (
    <ModalLayout
      defaultConfig={{
        useDim: true,
        allowDimClickClose: true,
        allowBackgroundScroll: false,
        type: "modal",
      }}
    >
      {children}
    </ModalLayout>
  );
};

export default CustomModal;
