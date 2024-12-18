import CustomDialog from "@components/CustomDialog";
import CustomModal from "@components/CustomModal";
import { useCustomModal } from "@hooks/useCustomModal";

import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";

const NestMdoal = () => {
  const { closeAllModals, closeModal } = useCustomModal();
  return (
    <CustomDialog>
      <div className="p-4 bg-white">
        <div>CustomDialog</div>
        <Button onClick={closeModal}>Close All Modal</Button>
      </div>
    </CustomDialog>
  );
};

const BasicPage = () => {
  const { openModal, closeModal } = useCustomModal();
  const handleOpenModal = () => {
    openModal(
      <CustomModal>
        <div className="p-4 bg-white">
          <div>모달입니다</div>
          <div className="flex gap-1">
            <Button onClick={() => openModal(<NestMdoal />)}>Open Modal</Button>
            <Button onClick={closeModal}>Close Modal</Button>
          </div>
        </div>
      </CustomModal>
    );
  };
  return (
    <PageLayout>
      <Button onClick={handleOpenModal}>오픈</Button>
    </PageLayout>
  );
};

export default BasicPage;
