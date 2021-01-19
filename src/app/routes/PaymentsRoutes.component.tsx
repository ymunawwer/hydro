import React from "react";
import { Route, Redirect } from "react-router-dom";
import Bills from "../components/bills/Bills.component";
import Payments from "../components/payments/Payments.redux";
import AllBeneficiaries from "../components/beneficiaries/Beneficiaries.redux";
import { renderComponentWithErrorBoundary } from "../containers/Main.container";

const PaymentRoutes = () => {
  return (
    <Route
      path="/payments"
      render={({ match: { path } }) => {
        return (
          <div>
            <Route
              exact
              path={`${path}`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/transfers`} />;
              }}
            />
            <Route
              exact
              path={`${path}/transfers`}
              render={(props: any) =>
                renderComponentWithErrorBoundary(Payments, props, "Payments")
              }
            />
            <Route
              exact
              path={`${path}/bills`}
              render={(props: any) =>
                renderComponentWithErrorBoundary(Bills, props, "Bills")
              }
            />
            <Route
              exact
              path={`${path}/beneficiaries`}
              render={({ match: { path } }) => {
                return <Redirect to={`${path}/all`} />;
              }}
            />
            <Route
              exact
              path={`${path}/beneficiaries/all`}
              render={(props: any) =>
                renderComponentWithErrorBoundary(
                  AllBeneficiaries,
                  props,
                  "AllBeneficiaries"
                )
              }
            />
            <Route
              exact
              path={`${path}/beneficiaries/pendingBeneficiaries`}
              render={(props: any) =>
                renderComponentWithErrorBoundary(
                  AllBeneficiaries,
                  props,
                  "PendingBeneficiaries"
                )
              }
            />
          </div>
        );
      }}
    />
  );
};

export default PaymentRoutes;
