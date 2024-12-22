import { useModal } from "@jinsewoon/react-modal-manager-hook";
import PageLayout from "@layouts/pageLayout/PageLayout";
import { Button } from "@shadcn/components/ui/button";
import { useEffect } from "react";

const NestMdoal = () => {
  const { openModal, closeModal, closeAllModals } = useModal();
  return (
    <div className="p-4 bg-white">
      <div>CustomDialog</div>
      <Button
        onClick={() =>
          openModal(<MyModal />, {
            onClose: () => {
              closeModal();
              console.log("모달이 닫혔습니다.3");
            },
          })
        }
      >
        My Modal
      </Button>
      <Button onClick={() => closeAllModals()}>Close All Modal</Button>
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
                onClose: () => console.log("모달이 닫혔습니다.2"),
              });
            }}
          >
            Open Modal
          </Button>
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
        onClose: () => console.log("모달이 닫혔습니다.1"),
      }
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
interface MyModalProps {
  onClose?: () => void;
}

const MyModal = ({ onClose }: MyModalProps) => {
  useEffect(() => {
    let render = true;
    console.log("mount", { render });
    return () => {
      render = false;
      console.log("unmount", { render });
      if (!render) console.log("언마운트 온클로즈");
    };
  }, []);
  return (
    <div className="p-4 bg-white">
      <h2>모달 콘텐츠</h2>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};
