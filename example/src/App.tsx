import "./App.css";
import { DefaultModalLayout, useModal } from "@jsw/react-modal-manager-hook";
import { useCustomModal } from "./hooks/useCustomModal";
import ModalLayout from "./layouts/ModalLayout";
function App() {
  const { openModal } = useCustomModal();

  return (
    <div style={{ width: "100%", height: "300dvh", backgroundColor: "teal" }}>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100dvh",
          }}
        >
          <button
            type="button"
            onClick={() =>
              openModal(
                <ModalLayout
                  defaultConfig={{
                    type: "modal",
                    useDim: true,
                    allowDimClickClose: false,
                    allowBackgroundScroll: false,
                  }}
                >
                  <Test />
                </ModalLayout>
              )
            }
          >
            Modal
          </button>
        </div>
      </div>
      <div style={{ height: "100dvh" }}></div>
    </div>
  );
}

export default App;

const Test = () => {
  const { openModal, closeModal, closeAllModals } = useModal();
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
                <button onClick={closeAllModals}>닫기</button>
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
