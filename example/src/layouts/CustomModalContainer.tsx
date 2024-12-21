import { useModal } from "jsw-react-modal-manager-hook";
import { AnimatePresence, motion } from "motion/react";
const CustomModalContainer = () => {
  const { modals, closeModal } = useModal();
  console.log(modals);
  return (
    <AnimatePresence>
      {modals.map(
        (modal, index) =>
          modal.isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              key={modal.id}
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 10000 + index,
              }}
              onClick={closeModal}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                {modal.component}
              </div>
            </motion.div>
          )
      )}
    </AnimatePresence>
  );
};

export default CustomModalContainer;
