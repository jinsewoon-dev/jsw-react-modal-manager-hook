import CustomModal from "@components/CustomModal";
import { useModal } from "@jsw/react-modal-manager-hook";

import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";

const BasicPage = () => {
  const { openModal } = useModal();
  const handleOpenModal = () => {
    openModal(
      <CustomModal>
        <div className="p-4 bg-white">df</div>
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
