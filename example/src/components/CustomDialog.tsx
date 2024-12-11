import { Modalayout } from "@jsw/react-modal-manager-hook";

interface CustomDialogProps {
  children: React.ReactNode;
}
const CustomDialog = ({ children }: CustomDialogProps) => {
  return (
    <Modalayout
      defaultConfig={{
        baseZindex: 20000,
        scrollable: false,
        canDimClickClose: false,
        hasDim: true,
      }}
    >
      {children}
    </Modalayout>
  );
};

export default CustomDialog;
