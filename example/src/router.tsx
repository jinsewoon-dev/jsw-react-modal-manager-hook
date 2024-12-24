import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BasicPage from "@pages/basic/Basic";
import IntroPage from "@pages/intro/Intro";

import { ROUTER_PATHS } from "@constants/ROUTER_PATHS";
import NestPage from "@pages/nest/Nest";
import FramerMotion from "@pages/framer-motion/FramerMotion";

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
      {
        path: ROUTER_PATHS.NEST,
        element: <NestPage />,
      },
      {
        path: ROUTER_PATHS.NEST,
        element: <NestPage />,
      },
      {
        path: ROUTER_PATHS.FRAMER_MOTION,
        element: <FramerMotion />,
      },
    ],
  },
]);
