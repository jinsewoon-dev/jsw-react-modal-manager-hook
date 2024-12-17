import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Basic from "./pages/Basic";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "basic", element: <Basic /> }],
  },
]);
