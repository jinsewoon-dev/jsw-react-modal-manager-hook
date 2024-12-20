import { ModalProvider } from "@jsw/react-modal-manager-hook";
// import CustomModalContainer from "@layouts/CustomModalContainer";
import GlobalLayout from "@layouts/globalLayout/GlobalLayout";
import { Outlet } from "react-router-dom";
import "@jsw/react-modal-manager-hook/BasicModalContainer.module.css"; // CSS 파일 import
function App() {
  return (
    // <ModalProvider
    //   customModalContainer={<CustomModalContainer />}
    //   cleanupDelay={300}
    // >
    <ModalProvider
      initialConfig={{
        cleanupDelay: 300,
        baseZindex: 20000,
        dimBackgroundColor: "rgba(0,0,0,0.7)",
      }}
    >
      <GlobalLayout>
        <Outlet />
      </GlobalLayout>
    </ModalProvider>
  );
}

export default App;
