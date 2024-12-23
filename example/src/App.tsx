import GlobalLayout from "@layouts/globalLayout/GlobalLayout";
import { Outlet } from "react-router-dom";
// import "@jinsewoon/react-modal-manager-hook/BasicModalContainer.module.css"; // CSS 파일 import
import { ModalProvider } from "@jinsewoon/react-modal-manager-hook";

function App() {
  return (
    <ModalProvider>
      <GlobalLayout>
        <Outlet />
      </GlobalLayout>
    </ModalProvider>
  );
}

export default App;
