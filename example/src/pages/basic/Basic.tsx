import { useModal } from "@jsw/react-modal-manager-hook";
import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";

const NestMdoal = () => {
  const { openModal, closeModal } = useModal();
  return (
    <div className="p-4 bg-white">
      <div>CustomDialog</div>
      <Button
        onClick={() =>
          openModal(<MyModal />, {
            id: "ree",
            onClose: () => {
              closeModal(["ree", "qwe"]);
              console.log("모달이 닫혔습니다.3");
            },
          })
        }
      >
        My Modal
      </Button>
      <Button onClick={() => closeModal()}>Close All Modal</Button>
    </div>
  );
};

const BasicPage = () => {
  const { modals, openModal, closeModal } = useModal();
  console.log(modals);
  const handleOpenModal = () => {
    openModal(
      <div className="p-4 bg-white">
        <div>모달입니다</div>
        <div className="flex gap-1">
          <Button
            onClick={() => {
              console.log("????");
              openModal(<NestMdoal />, {
                id: "qwe",
                onClose: () => console.log("모달이 닫혔습니다.2"),
              });
            }}
          >
            Open Modal
          </Button>
          <Button
            onClick={() => {
              closeModal("asd");
            }}
          >
            Close Modal
          </Button>
        </div>
      </div>,
      {
        id: "asd",
        onClose: () => console.log("모달이 닫혔습니다.1"),
      }
    );
  };
  return (
    <PageLayout>
      <Button onClick={handleOpenModal}>오픈</Button>
    </PageLayout>
  );
};

export default BasicPage;
interface MyModalProps {
  onClose?: () => void;
}

const MyModal = ({ onClose }: MyModalProps) => {
  return (
    <div className="p-4 bg-white">
      <h2>모달 콘텐츠</h2>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};
