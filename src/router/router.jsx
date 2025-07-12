import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../components/ErrorPage";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import addProduct from "../pages/Dashboard/addProduct";
import MyProducts from "../pages/Dashboard/MyProducts";
import MyProfile from "../pages/Dashboard/MyProfile";
import Products from "../pages/Products";
import ProductDetails from "../pages/Dashboard/ProductDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails></ProductDetails>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        path: "addProduct",
        Component: addProduct,
      },
      {
        path: "myProducts",
        Component: MyProducts,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
    ],
  },
]);
