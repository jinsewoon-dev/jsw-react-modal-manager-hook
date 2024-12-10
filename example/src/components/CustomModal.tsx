import { Modalayout } from "@jsw/react-modal-manager-hook";

interface CustomModalProps {
  children: React.ReactNode;
}
const CustomModal = ({ children }: CustomModalProps) => {
  return (
    <Modalayout
      config={{
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
