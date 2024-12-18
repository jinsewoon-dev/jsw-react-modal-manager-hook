import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";
import { CustomModalConfig, useCustomModal } from "../hooks/useCustomModal";
import {
  // DefaultModalLayout,
  TModalDefaultConfig,
  TModalLayoutState,
} from "@jsw/react-modal-manager-hook";

interface ModalLayoutProps extends PropsWithChildren {
  state: TModalLayoutState;
  defaultConfig: TModalDefaultConfig<CustomModalConfig>;
}
const ModalLayout = ({ children, state, defaultConfig }: ModalLayoutProps) => {
  const { modals, closeModal } = useCustomModal();
  const currentModal = modals[modals.length - 1];

  return (
    <AnimatePresence>
      {currentModal.isVisible && (
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
          }}
          onClick={() =>
            currentModal.config?.allowDimClickClose ??
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
            zIndex: 10000 + currentModal.state.index,
          }}
        >
          <motion.div onClick={(e) => e.stopPropagation()}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  // return (
  // <DefaultModalLayout<CustomModalConfig> defaultConfig={defaultConfig}>
  //   {children}
  // </DefaultModalLayout>
  // );
};

export default ModalLayout;
