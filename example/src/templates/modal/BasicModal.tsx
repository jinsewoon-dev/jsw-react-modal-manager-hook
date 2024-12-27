import { useModal } from "@jinsewoon/react-modal-manager-hook";
import ModalLayout from "@layouts/modalLayout/ModalLayout";
import { Button } from "@shadcn/components/ui/button";
// import { useState } from "react";

const BasicModal = () => {
  // const [isVisible, setIsVisible] = useState<boolean>(true);
  const { closeModal, removeModal } = useModal();

  return (
    <ModalLayout>
      <div className={`p-4 bg-white`}>
        <div>BasicModal</div>
        <div className="flex gap-2">
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
