import { useModal } from "@jinsewoon/react-modal-manager-hook";
import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";
import BasicModal from "@templates/modal/BasicModal";

const BasicPage = () => {
  const { openModal } = useModal();
  const handleOpenModal = () => {
    openModal(<BasicModal />);
  };
  return (
    <PageLayout>
      <Button onClick={handleOpenModal}>오픈</Button>
    </PageLayout>
  );
};

export default BasicPage;
