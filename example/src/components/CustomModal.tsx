// import { Modalayout } from "@jsw/react-modal-manager-hook";
import { PropsWithChildren } from "react";
import ModalLayout from "../layouts/ModalLayout";

const CustomModal = ({ children }: PropsWithChildren) => {
  return (
    <ModalLayout
    // defaultConfig={{
    //   customDimColor: "rgba(25, 89, 227,0.3)",
    //   baseZindex: 10000,
    //   scrollable: true,
    //   canDimClickClose: true,
    //   hasDim: false,
    // }}
    >
      {children}
    </ModalLayout>
  );
};

export default CustomModal;
