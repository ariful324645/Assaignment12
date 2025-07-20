import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../components/ErrorPage";
import DashBoardLayout from "../Layouts/DashBoardLayout";

import Products from "../pages/Products";
import ProductDetails from "../pages/Dashboard/ProductDetails";

import UpdateProduct from "../pages/Dashboard/UpdateProduct";

import ReportedContents from "../pages/Modaretor/ReportedContents";

import ManageCoupons from "../pages/Admin/ManageCoupons";
import PrivateRoute from "../context/PrivateRoute";
import MyProfile from "../pages/Dashboard/MyProfile";
import MyProducts from "../pages/Dashboard/MyProducts";
import AddProduct from "../pages/Dashboard/addProduct";
import ProductReviewQueue from "../pages/Modaretor/ProductReviewQueue";
import ManageUsers from "../pages/Admin/ManageUsers";
import Statistics from "../pages/Admin/Statistics";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        path: "/",
        index: true,
        element: <Home></Home>,
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
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",

        Component: Statistics,
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>{" "}
          </PrivateRoute>
        ),
      },
      // Moderator

      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "updateProduct/:productId",
        Component: UpdateProduct,
      },
      {
        path: "ProductReviewQueue",
        element: (
          <PrivateRoute>
            <ProductReviewQueue></ProductReviewQueue>
          </PrivateRoute>
        ),
      },
      {
        path: "reportedContents",
        element: (
          <PrivateRoute>
            <ReportedContents></ReportedContents>
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <Statistics></Statistics>
          </PrivateRoute>
        ),
      },
      {
        path: "manageCoupons",
        element: (
          <PrivateRoute>
            <ManageCoupons></ManageCoupons>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
