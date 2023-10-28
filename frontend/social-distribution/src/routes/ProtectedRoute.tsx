import React from "react";
import {Navigate, Outlet, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";


export const ProtectedRoute = ({ children }: RouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth.account ? <>{children}</> : <Navigate to="/" />;
};


export default ProtectedRoute;