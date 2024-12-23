import { useModal } from "@jinsewoon/react-modal-manager-hook";
import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";

const NestMdoal = () => {
  const { openModal, closeAllModals, removeAllModals } = useModal();
  console.log("[modal render] : NestMdoal");
  return (
    <div className="p-4 bg-white fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[10000]">
      <div>CustomDialog</div>
      <Button onClick={() => openModal(<MyModal />, {})}>My Modal</Button>
      <Button
        onClick={() => {
          closeAllModals();
          removeAllModals();
        }}
      >
        Close All Modal
      </Button>
    </div>
  );
};

const BasicPage = () => {
  const { openModal, closeModal, removeModal } = useModal();
  console.log("[modal render] : BasicPage");
  const handleOpenModal = () => {
    openModal(
      <div className="p-4 bg-white fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[10000]">
        <div>모달입니다</div>
        <div className="flex gap-1">
          <Button
            onClick={() => {
              openModal(<NestMdoal />);
            }}
          >
            Open Modal
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
    );
  };
  return (
    <PageLayout>
      <div className=" h-[200dvh]">
        <Button onClick={handleOpenModal}>오픈</Button>
      </div>
    </PageLayout>
  );
};

export default BasicPage;

const MyModal = () => {
  const { closeModal } = useModal();
  console.log("[modal render] : MyModal");
  return (
    <div className="p-4 bg-white">
      <h2>모달 콘텐츠</h2>
      <button onClick={() => closeModal()}>닫기</button>
    </div>
  );
};
