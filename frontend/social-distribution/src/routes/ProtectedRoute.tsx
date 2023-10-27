import React from "react";
import {Navigate, Outlet, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ProtectedRoute = (props: RouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.account) {
    if (props.path === "/") {
      console.log("In Protected Route")
      return <Navigate to={"/home"} />;
    }
    console.log("not")
    return <Navigate to={"/"} />;
  } else if (!auth.account) {
    return <Navigate to={"/"} />;
  } else {
    return <div>Not found</div>;
  }
};

export default ProtectedRoute;