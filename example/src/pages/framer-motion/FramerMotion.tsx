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
  return (
    <div></div>
    // <CustomModal
    //   confirmText="중첩 모달"
    //   handleConfirm={() => {
    //     openModal(
    //       <CustomModal
    //         confirmText="마지막 모달"
    //         handleConfirm={() => {}}
    //         handleCancel={() => {}}
    //         allowOverlayClickClose
    //       >
    //         안녕하세요
    //       </CustomModal>
    //     );
    //   }}
    //   handleCancel={() => {
    //     closeModal();
    //   }}
    // >
    //   안녕하세요
    // </CustomModal>
  );
};

interface CustomModalProps {
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  handleConfirm?: VoidFunction;
  handleCancel?: VoidFunction;
  allowOverlayClickClose?: boolean;
}
// const CustomModal = ({
//   children,
//   confirmText = "확인",
//   cancelText = "취소",
//   handleConfirm,
//   handleCancel,
//   allowOverlayClickClose = false,
// }: CustomModalProps) => {
//   return (
//     <Modal.Root className="fixed inset-0 overscroll-none z-[10000]">
//       <Modal.Overlay
//         allowOverlayClickClose={allowOverlayClickClose}
//         className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] overflow-auto overscroll-none z-1"
//       >
//         <Modal.Content className="w-[200px] mx-auto rounded-md p-4 bg-white">
//           {children}
//           <div className="flex gap-2">
//             <Button onClick={handleConfirm}>{confirmText}</Button>
//             <Button asChild>
//               <Modal.Cancel onClick={handleCancel}>{cancelText}</Modal.Cancel>
//             </Button>
//           </div>
//         </Modal.Content>
//       </Modal.Overlay>
//     </Modal.Root>
//   );
// };
