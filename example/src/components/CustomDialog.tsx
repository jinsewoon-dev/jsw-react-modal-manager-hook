import { Modalayout } from "@jsw/react-modal-manager-hook";

interface CustomDialogProps {
  children: React.ReactNode;
}
const CustomDialog = ({ children }: CustomDialogProps) => {
  return (
    <Modalayout
      config={{
        baseZindex: 20000,
        scrollable: false,
        canDimClickCLose: false,
        hasDim: false,
      }}
    >
      {children}
    </Modalayout>
  );
};

export default CustomDialog;
