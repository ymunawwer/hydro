import { connect } from "react-redux";
import { Dispatch } from "redux";
import ResetPassword from "./ResetPassword.component";
import { IResetPasswordCallDdetails } from "./ResetPassword.actionTypes";
import { fetch_UserDetails, reset_PasswordCall } from "./ResetPassword.action";

export const mapStateToProps = (state: any) => {
  return {
    email: state.resetPassword.email,
    maskedEmail: state.resetPassword.maskedEmail,
    phone: state.resetPassword.phone,
    maskedPhoneNumber: state.resetPassword.maskedPhoneNumber,
    otpStatus: state.twoStepAuth.continue.otpStatus,
    message: state.twoStepAuth.continue.message,
    continue: state.twoStepAuth.continue.continue,
    continueLoading: state.twoStepAuth.continue.loading,
    selectedOption: state.twoStepAuth.continue.selectedOption,
    verifyOtpState: state.twoStepAuth.verifyOtp,
    userName: state.resetPassword.userName,
    encodedUserName: state.resetPassword.encodedUserName,
    showPwdScreen: state.resetPassword.showPwdScreen,
    verifyStatus: state.resetPassword.status,
    verifyMessage: state.resetPassword.message,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchUserDetails: (encodedUserName: string) =>
      dispatch(fetch_UserDetails(encodedUserName)),
    clickContinue: (authData: any) =>
      // dispatch(twoStepAuthCall(user))
      dispatch({
        type: "CONTINUE",
        payload: authData,
      }),
    resetPasswordCall: (data: IResetPasswordCallDdetails) =>
      dispatch(reset_PasswordCall(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
