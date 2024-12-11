import "./App.css";
import { useModal } from "@jsw/react-modal-manager-hook";

import CustomModal from "./components/CustomModal";
import CustomDialog from "./components/CustomDialog";
function App() {
  const { modals, openModal } = useModal();
  console.log(modals);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() =>
            openModal(
              <CustomModal>
                <Test />
              </CustomModal>,
              {
                canDimClickClose: false,
                scrollable: false,
                hasDim: true,
              }
            )
          }
        >
          Modal
        </button>
      </div>
    </>
  );
}

export default App;

const Test = () => {
  const { openModal, closeModal, closeAllModal } = useModal();
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <button
        onClick={() => {
          openModal(
            <CustomDialog>
              <div>
                <div>Dialog</div>
                <button onClick={closeAllModal}>닫기</button>
              </div>
            </CustomDialog>,
            {
              scrollable: true,
              canDimClickClose: true,
            }
          );
        }}
      >
        Test Open
      </button>
      <button onClick={closeModal}>닫기</button>
    </div>
  );
};
