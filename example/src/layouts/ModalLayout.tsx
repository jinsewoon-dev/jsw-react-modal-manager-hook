import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";
import { CustomModalConfig, useCustomModal } from "../hooks/useCustomModal";
import { TModalConfig } from "@jsw/react-modal-manager-hook";

interface ModalLayoutProps extends PropsWithChildren {
  defaultConfig: TModalConfig<CustomModalConfig>;
}
const ModalLayout = ({ children, defaultConfig }: ModalLayoutProps) => {
  const { lastedModal, closeModal } = useCustomModal();

  return (
    <AnimatePresence>
      <motion.div
        key={lastedModal.state.id}
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
          lastedModal.config?.allowDimClickClose ??
          defaultConfig.allowDimClickClose
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
          zIndex: 10000 + lastedModal.state.index,
        }}
      >
        <motion.div onClick={(e) => e.stopPropagation()}>{children}</motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalLayout;
