// import { Modalayout } from "@jsw/react-modal-manager-hook";

import { PropsWithChildren } from "react";
import ModalLayout from "../layouts/ModalLayout";

const CustomDialog = ({ children }: PropsWithChildren) => {
  return (
    <ModalLayout
      defaultConfig={{
        animationType: "fade",
        customHeader: <div>asdasd</div>,
      }}
      // defaultConfig={{
      //   customDimColor: "rgba(0,0,0,0.5)",
      //   baseZindex: 20000,
      //   scrollable: false,
      //   canDimClickClose: false,
      //   hasDim: true,
      // }}
    >
      {children}
    </ModalLayout>
  );
};

export default CustomDialog;
