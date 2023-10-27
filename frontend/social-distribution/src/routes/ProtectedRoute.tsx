import React from "react";
import {Navigate, Outlet, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ProtectedRoute = (props: RouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.account) {
    if (props.path === "") {
      console.log("In Protected Route")
      return <Navigate to={"/explore"} />;
    }
    //This needs to send to other routes
    return <Navigate to={"/explore"} />;
  } else if (!auth.account) {
    console.log("account NOT authenticated")
    return <Navigate to={"/"} />;
  } else {
    return <div>Not found</div>;
  }
};

export default ProtectedRoute;