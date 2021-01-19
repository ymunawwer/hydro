import React from "react";
import { Route, Redirect } from "react-router-dom";
import CreateUserProfile from "../components/user_profiles/createUser/CreateUserProfile.redux";
import AllUserProfiles from "../components/user_profiles/all_user_profiles/AllUserProfiles.redux";
import UserManagement from "../components/user_profiles/user_management/UserManagement.redux";
import RoleManagement from "../components/user_profiles/role_management/RoleManagement.redux";

export const UserProfileRoutes = () => {
  return (
    <Route
      path="/userprofile"
      render={({ match: { path } }) => {
        return (
          <div>
            <Route
              exact
              path={`${path}`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route exact path={`${path}/all`} component={AllUserProfiles} />
            <Route
              exact
              path={`${path}/create/:id?`}
              component={CreateUserProfile}
            />
            <Route
              exact
              path={`${path}/usermanagement/:companyProfileId?/:id?`}
              component={UserManagement}
            />
            <Route
              exact
              path={`${path}/rolemanagement/:companyProfileId?/:id?`}
              component={RoleManagement}
            />
          </div>
        );
      }}
    />
  );
};
