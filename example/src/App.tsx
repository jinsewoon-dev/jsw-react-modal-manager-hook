import "./App.css";
import { DefaultModalLayout, useModal } from "@jsw/react-modal-manager-hook";
function App() {
  const { openModal } = useModal();

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
      </div>
      {/* <div>
        <div style={{ position: "relative" }}>
          <div>
            <div style={{ position: "relative" }}>
              <div>
                <div
                  style={{
                    height: "10dvh",
                    backgroundColor: "red",
                    position: "sticky",
                    zIndex: 0,
                    top: 0,
                  }}
                >
                  123123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div style={{ height: "100dvh" }}></div>
    </div>
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
