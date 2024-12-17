import GlobalLayout from "@layouts/globalLayout/GlobalLayout";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <GlobalLayout>
      <Outlet />
    </GlobalLayout>
  );
}

export default App;
