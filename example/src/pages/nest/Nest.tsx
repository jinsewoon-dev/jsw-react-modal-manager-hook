import { useModal } from "@jinsewoon/react-modal-manager-hook";
import ModalLayout from "@layouts/modalLayout/ModalLayout";
import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";
import BasicModal from "@templates/modal/BasicModal";

const NestPage = () => {
  const { openModal, closeModal, removeModal } = useModal();
  const handleOpenModal = () => {
    openModal(
      <ModalLayout>
        <div className="p-4 bg-white">
          <div>Nested Modal</div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                openModal(<BasicModal />);
              }}
            >
              Open Nested Modal
            </Button>
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
  return (
    <PageLayout>
      <Button onClick={handleOpenModal}>오픈</Button>
    </PageLayout>
  );
};

export default NestPage;
