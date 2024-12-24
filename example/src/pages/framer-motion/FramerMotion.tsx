import { useModal } from "@jinsewoon/react-modal-manager-hook";
import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";
const FramerMotion = () => {
  const { openModal } = useModal();
  return (
    <PageLayout>
      <Button onClick={() => openModal(<MotionModal />)}>오픈</Button>
    </PageLayout>
  );
};

export default FramerMotion;

const MotionModal = () => {
  const { openModal, closeModal, closeAllModals } = useModal();
  return (
    <div className="p-4 bg-white rounded-lg">
      <div>Motion Modal</div>
      <div className="flex gap-2">
        <Button
          onClick={() =>
            openModal(
              <div className="p-4 bg-white rounded-lg">
                <div>Motion Modal</div>
                <div className="flex gap-2">
                  <Button onClick={() => closeAllModals()}>Close Modal</Button>
                </div>
              </div>
            )
          }
        >
          Open Modal
        </Button>
        <Button onClick={() => closeModal()}>Close Modal</Button>
      </div>
    </div>
  );
};
