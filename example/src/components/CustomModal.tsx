// import { Modalayout } from "@jsw/react-modal-manager-hook";
import ModalLayout from "../layouts/ModalLayout";
interface CustomModalProps {
  children: React.ReactNode;
}
const CustomModal = ({ children }: CustomModalProps) => {
  return (
    <ModalLayout
      defaultConfig={{
        customDimColor: "rgba(25, 89, 227,0.3)",
        baseZindex: 10000,
        scrollable: true,
        canDimClickClose: true,
        hasDim: false,
      }}
    >
      {children}
    </ModalLayout>
  );
};

export default CustomModal;
