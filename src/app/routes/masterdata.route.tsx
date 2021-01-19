import React from "react";
import { Route, Redirect } from "react-router-dom";
import Groups from "../components/master_data_management/groups/Groups.redux";
import CreateGroups from "../components/master_data_management/groups/CreateGroups.redux";
import Banks from "../components/master_data_management/banks/Banks.redux";
import CreateBanks from "../components/master_data_management/banks/CreateBanks.redux";
import Bills from "../components/master_data_management/bills/Bills.redux";
import CreateBills from "../components/master_data_management/bills/CreateBills.redux";
import Modules from "../components/master_data_management/modules/Modules.redux";
import CreateModule from "../components/master_data_management/modules/CreateModule.redux";
import LicenceType from "../components/master_data_management/licence_type/Licenses.redux";
import CreateLicense from "../components/master_data_management/licence_type/CreateLicense.redux";
import ErrorCodes from "../components/master_data_management/error_codes/ErrorCodes.redux";
import CreateErrorCodes from "../components/master_data_management/error_codes/CreateErrorCodes.redux";

import Translations from "../components/master_data_management/translations/Translations.redux";
import Create from "../components/master_data_management/translations/Create.redux";

export const MasterDataRoutes = () => {
  return (
    <Route
      path="/masterdata"
      render={({ match: { path } }) => {
        return (
          <div>
            <Route
              exact
              path={`${path}`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/groups/all`} />;
              }}
            />

            <Route
              exact
              path={`${path}/groups`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route exact path={`${path}/groups/all`} component={Groups} />
            <Route
              exact
              path={`${path}/groups/create`}
              component={CreateGroups}
            />

            <Route
              exact
              path={`${path}/banks`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route exact path={`${path}/banks/all`} component={Banks} />
            <Route
              exact
              path={`${path}/banks/create`}
              component={CreateBanks}
            />

            <Route
              exact
              path={`${path}/bills`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route exact path={`${path}/bills/all`} component={Bills} />
            <Route
              exact
              path={`${path}/bills/create`}
              component={CreateBills}
            />

            <Route
              exact
              path={`${path}/modules`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route exact path={`${path}/modules/all`} component={Modules} />
            <Route
              exact
              path={`${path}/modules/create`}
              component={CreateModule}
            />

            <Route
              exact
              path={`${path}/licences`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route
              exact
              path={`${path}/licences/all`}
              component={LicenceType}
            />
            <Route
              exact
              path={`${path}/licences/create`}
              component={CreateLicense}
            />

            <Route
              exact
              path={`${path}/error-codes`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route
              exact
              path={`${path}/error-codes/all`}
              component={ErrorCodes}
            />
            <Route
              exact
              path={`${path}/error-codes/create`}
              component={CreateErrorCodes}
            />

            <Route
              exact
              path={`${path}/translations`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route
              exact
              path={`${path}/translations/all`}
              component={Translations}
            />
            <Route
              exact
              path={`${path}/translations/create`}
              component={Create}
            />
          </div>
        );
      }}
    />
  );
};
