import React, { use } from "react";
import { AuthContext } from "./AuthContext";
import Loading from "../components/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user,loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
