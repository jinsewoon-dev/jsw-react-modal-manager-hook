import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BasicPage from "@pages/basic/Basic";
import IntroPage from "@pages/intro/Intro";

export const ROUTER_PATHS = {
  INTRO: "/",
  BASIC: "/basic",
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: ROUTER_PATHS.INTRO, element: <IntroPage /> },
      {
        path: ROUTER_PATHS.BASIC,
        element: <BasicPage />,
      },
    ],
  },
]);
