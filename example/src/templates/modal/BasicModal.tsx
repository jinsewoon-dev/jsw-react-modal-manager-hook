import { useModal } from "@jinsewoon/react-modal-manager-hook";
import ModalLayout from "@layouts/modalLayout/ModalLayout";
import { Button } from "@shadcn/components/ui/button";

const BasicModal = () => {
  const { closeModal, removeModal } = useModal();
  return (
    <ModalLayout>
      <div className="p-4  bg-white">
        <div>{}</div>
        <div>BasicModal</div>
        <div className="flex gap-1">
          <Button
            onClick={() => {
              closeModal();
              removeModal();
            }}
          >
            Close Modal
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default BasicModal;
