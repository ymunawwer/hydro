import { connect } from "react-redux";
import { Dispatch } from "redux";
import Login from "./Login.component";
import { login } from "./Login.action";
import {
  IUserDetails,
  IReduxLoginState,
  LoginActionTypes,
} from "./Login.actionTypes";
import { LogoutActionTypes } from "./../header/Header.actionTypes";


export const mapStateToProps = (state: IReduxLoginState) => {
  return {
    //...state,
    user: state.user,
    sessionTimout: state.userLogout.sessionTimeout,
    twoStepVerification: state.user.data?.twoStepVerification,
    email: state.user.data?.email,
    phone: state.user.data?.phone,
    userName: state.user.data?.userName,
    loggedInUserId: state.user.data ? state.user.data._id : "",
    loggedInCompany: state.user.data ? state.user.data.fk_company_id : "",
    auditResponse: state.auditData,
    accessToken: state.user && state.user.data && state.user.data.accessToken,
    forgotUserId: state.forgotUserIdReducer.forgotUserId,
    auditData: state.auditData,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogin: (user: IUserDetails) => dispatch(login(user)),
    resetSessionTimeout: () => {
      dispatch({
        type: LogoutActionTypes.RESET_SESSION_TIMEOUT,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
