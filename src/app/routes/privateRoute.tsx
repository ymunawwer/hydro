import { IUserDetails } from "../components/login/Login.actionTypes";
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import * as Cookies from "js-cookie";
import { grantCategoryAccess, getUserFromStore } from "../utils/roleHelper";

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  if (!Component) return null;
  const user: IUserDetails = getUserFromStore();
  return (
    <Route
      {...rest}
      render={(props) => {
        const path: string = props.match.path.replace("/", "");
        /*if (
          typeof grantCategoryAccess(path) === "boolean" &&
          !grantCategoryAccess(path)
        ) {
          return <Redirect to="/pagenotfound" />;
        }*/
        return 1 || (user && user.accessToken) || Cookies.get("user") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
