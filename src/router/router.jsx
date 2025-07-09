import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home";
import Navbar from "../pages/Navbar";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/navbar",
        Component: Navbar,
      },
    ],
  },
]);
