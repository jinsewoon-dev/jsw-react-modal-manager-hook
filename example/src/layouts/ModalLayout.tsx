import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";
import { CustomModalConfig } from "../main";
import { useCustomModal } from "../hooks/useCustomModal";

interface ModalLayoutProps extends PropsWithChildren {
  defaultConfig: CustomModalConfig;
}
const ModalLayout = ({ children, defaultConfig }: ModalLayoutProps) => {
  const { modal } = useCustomModal();

  // const currentModal = modals[modal.state.index];
  return (
    <AnimatePresence>
      <motion.div
        key={modal.state.id}
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
        // onClick={() =>
        //   modal.config?.canDimClickClose ??
        //   defaultConfig.canDimClickClose
        //     ? closeModal()
        //     : null
        // }
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 10000 + modal.state.index,
        }}
      >
        <motion.div onClick={(e) => e.stopPropagation()}>{children}</motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalLayout;
