import GlobalLayout from "@layouts/globalLayout/GlobalLayout";
import { Outlet } from "react-router-dom";
import { ModalProvider } from "@jinsewoon/react-modal-manager-hook";
// import CustomModalContainer from "@layouts/customModalLayout/CustomModalContainer";
function App() {
  return (
    <ModalProvider
    // customContainer={<CustomModalContainer />}
    >
      <GlobalLayout>
        <Outlet />
      </GlobalLayout>
    </ModalProvider>
  );
}

export default App;
