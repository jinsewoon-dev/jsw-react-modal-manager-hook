import "./App.css";
import { useModal } from "@jsw/react-modal-manager-hook";
import Modal from "./components/Modal";
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
              <Modal>
                <Test />
              </Modal>
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
            <Modal>
              <div style={{ backgroundColor: "teal" }}>
                <div>Dialog</div>
                <button onClick={closeAllModal}>닫기</button>
              </div>
            </Modal>,
            {
              hasDim: false,
              // canDimClickCLose: true,
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
