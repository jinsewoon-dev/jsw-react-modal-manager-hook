import { ModalProvider } from "@jsw/react-modal-manager-hook";
import GlobalLayout from "@layouts/globalLayout/GlobalLayout";
import { Outlet } from "react-router-dom";

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
