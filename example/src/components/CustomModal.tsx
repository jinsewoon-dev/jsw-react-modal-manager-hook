import { Modalayout } from "@jsw/react-modal-manager-hook";

interface CustomModalProps {
  children: React.ReactNode;
}
const CustomModal = ({ children }: CustomModalProps) => {
  return (
    <Modalayout
      defaultConfig={{
        customDimColor: "rgba(25, 89, 227,0.3)",
        baseZindex: 10000,
        scrollable: true,
        canDimClickCLose: true,
        hasDim: true,
      }}
    >
      {children}
    </Modalayout>
  );
};

export default CustomModal;
