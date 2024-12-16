import "./App.css";
import { DefaultModalLayout, useModal } from "@jsw/react-modal-manager-hook";
function App() {
  const { openModal } = useModal();

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() =>
            openModal(
              <DefaultModalLayout
                defaultConfig={{
                  useDim: true,
                  allowDimClickClose: false,
                  allowBackgroundScroll: false,
                }}
              >
                <Test />
              </DefaultModalLayout>
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
            <DefaultModalLayout
              defaultConfig={{
                useDim: false,
                allowDimClickClose: false,
                allowBackgroundScroll: false,
              }}
            >
              <div>
                <div>Dialog</div>
                <button onClick={closeAllModal}>닫기</button>
              </div>
            </DefaultModalLayout>
          );
        }}
      >
        Test Open
      </button>
      <button onClick={closeModal}>닫기</button>
    </div>
  );
};
