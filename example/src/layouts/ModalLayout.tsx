import {
  TModalDefaultConfig,
  TModalLayoutState,
  useModal,
} from "@jsw/react-modal-manager-hook";
import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";

interface ModalLayoutProps extends PropsWithChildren {
  state?: TModalLayoutState;
  defaultConfig: TModalDefaultConfig;
}
const ModalLayout = ({
  children,
  state = { id: "", index: 0, isVisible: true },
  defaultConfig,
}: ModalLayoutProps) => {
  const { modals, closeModal, cleanupModals } = useModal();
  const currentModal = modals[state.index];
  return (
    <AnimatePresence>
      {currentModal.state.isVisible && (
        <motion.div
          key={currentModal.state.id}
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "ease",
          }}
          onClick={() =>
            currentModal.config?.canDimClickClose ??
            defaultConfig.canDimClickClose
              ? closeModal()
              : null
          }
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 10000 + state.index,
          }}
        >
          <motion.div onClick={(e) => e.stopPropagation()}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalLayout;
