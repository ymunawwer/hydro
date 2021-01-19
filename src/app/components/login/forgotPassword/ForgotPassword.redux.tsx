import { connect } from "react-redux";
import { Dispatch } from "redux";
import ForgotPassword from "./ForgotPassword.component";
import { getUserNameForgotPswd } from "./ForgotPassword.action";

export const mapStateToProps = (state: any) => {
  return {
    message: state.forgotPswd.message,
    loading: state.forgotPswd.loading,
    //encodedUserName: state.forgotPswd.encodedUserName,
    /* showPwdScreen: state.changePassword.showPwdScreen,
    changePwdState: state.changePassword, */
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUserNameForgotPswd: (email: string) =>
      dispatch(getUserNameForgotPswd(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
