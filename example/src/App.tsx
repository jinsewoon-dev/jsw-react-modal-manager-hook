import { Outlet } from "react-router-dom";
import "./App.css";
import { ModalProvider } from "@jsw/react-modal-manager-hook";

function App() {
  return (
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  );
}

export default App;
