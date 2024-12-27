import { Modal, useModal } from "@jinsewoon/react-modal-manager-hook";
import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";
const BasicPage = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <Modal.Root className="fixed inset-0 overscroll-none z-[10000]">
        <Modal.Overlay
          allowOverlayClickClose
          className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] overflow-auto overscroll-none z-1"
        >
          <Modal.Content className="w-[200px] mx-auto p-8 bg-slate-300">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  openModal(<NestedModal />);
                }}
              >
                오픈 모달
              </button>
              <Modal.Cancel>취소</Modal.Cancel>
            </div>
          </Modal.Content>
        </Modal.Overlay>
      </Modal.Root>
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

const NestedModal = () => {
  const { closeAllModals, cleanupModals } = useModal();
  return (
    <Modal.Root className="fixed inset-0 overscroll-none z-[10000]">
      <Modal.Overlay className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] overflow-auto overscroll-none z-1">
        <Modal.Content className="w-[200px] mx-auto p-4 bg-slate-300">
          <Modal.Cancel
            onClick={() => {
              closeAllModals();
              cleanupModals();
            }}
          >
            전체 취소
          </Modal.Cancel>
        </Modal.Content>
      </Modal.Overlay>
    </Modal.Root>
  );
};
