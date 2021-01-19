import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Login from "../components/login/Login.redux";
import PageNotFound from "../components/page_not_found/PageNotFound.component";
import PrivateRoute from "../routes/privateRoute";
import * as Cookies from "js-cookie";
import "./../_Styles.scss";
import "../assets/fonts/style.scss";
import "./toastr.scss";
import { connect } from "react-redux";
import { login } from "../components/login/Login.action";
import {
  IUserDetails,
  IReduxLoginState,
} from "../components/login/Login.actionTypes";
import { getUserFromStore } from "../utils/roleHelper";
//const _isEmpty = require("lodash.isempty");
//Water meter
import SideNav from "../components/sidenav/SideNav.component"
import Dashboard from "../components/dashboard/Dashboard.component"
import Header from "../components/header/Header.redux";
import MeterReading from "../components/meterReading/MeterReading.component";
import Notifications from "../components/notifications/Notifications.component";
import TicketStatus from "../components/ticketStatus/TicketStatus.redux";

const mapDispatchToProps = {
  login,
};

const mapStateToProps = (state: IReduxLoginState) => {
  return {
    userInfo: state.user,
  };
};


const MainContainer = (props: any) => {

  const user: IUserDetails = getUserFromStore();
  return (
    <>
    <div>     
    {props.location.pathname!=='/login' && <Header /> }
    {props.location.pathname!=='/login' && <SideNav {...props} /> }
    <div  className={props.location.pathname!=='/login'?"innercontent":''}>     
      <main>
        <Switch>
          <Route
            path="/login"
            component={Login}
            exact
          />
          <PrivateRoute component={PageNotFound} path="/pagenotfound" />
         
          <Route
            path="/dashboard"
            component={Dashboard}
            exact
          />
          <PrivateRoute component={Dashboard} path="/dashboard"  />
          <PrivateRoute component={MeterReading} path="/meterReading"  />
          <PrivateRoute component={Notifications} path="/notifications"  />
          <PrivateRoute component={TicketStatus} path="/ticketStatus"  />

          <PrivateRoute component={PageNotFound} />

          
        </Switch>
      </main>
    </div>
    </div>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainContainer));
