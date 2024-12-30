import { useModal } from "@jinsewoon/react-modal-manager-hook";
import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";
const BasicPage = () => {
  const { modals, openModal, closeModal } = useModal();
  console.log(modals);
  const handleOpenModal = () => {
    openModal(
      <div className="p-4 bg-white">
        adasd
        <div>
          <Button
            onClick={() => {
              closeModal();
            }}
          >
            Close Modal
          </Button>
        </div>
      </div>,
      {
        allowOverlayClickClose: true,
      }
    );
  };
  return (
    <PageLayout>
      <div className="h-[200dvh]">
        <Button onClick={handleOpenModal}>오픈</Button>
      </div>
    </PageLayout>
  );
};

export default BasicPage;
