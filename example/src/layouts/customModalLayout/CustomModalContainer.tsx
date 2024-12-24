import {
  useModal,
  useModalById,
  useModalIds,
} from "@jinsewoon/react-modal-manager-hook";
const CustomModalContainer = () => {
  const modals = useModalIds();
  console.log(modals);
  return modals.map((id) => {
    return <Modal key={id} id={id} />;
  });
};

const Modal = ({ id }: { id: string }) => {
  const modal = useModalById(id);
  const { closeModal, removeModal } = useModal();

  return (
    <div
      onClick={() => closeModal()}
      onAnimationEnd={() => !modal?.isVisible && removeModal(id)}
      className={`flex justify-center items-center
   fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[10000] ${
     modal?.isVisible
       ? "fadeIn pointer-events-auto"
       : "fadeOut pointer-events-none"
   }`}
    >
      {modal?.component}
    </div>
  );
};

export default CustomModalContainer;
