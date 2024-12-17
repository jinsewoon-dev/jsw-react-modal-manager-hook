import { Outlet } from "react-router-dom";
import "./App.css";
import { ModalProvider } from "@jsw/react-modal-manager-hook";
import RootLayout from "@layouts/RootLayout";

function App() {
  return (
    <ModalProvider>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </ModalProvider>
  );
}

export default App;
