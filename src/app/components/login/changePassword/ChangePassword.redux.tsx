import { connect } from "react-redux";
import { Dispatch } from "redux";
import ChangePassword from "./ChangePassword.component";
import { IchangePasswordCallDdetails } from "./changePassword.actionTypes";
import { changePasswordCall } from "./changePassword.action";

export const mapStateToProps = (state: any) => {
  return {
    showPwdScreen: state.changePassword.showPwdScreen,
    changePwdState: state.changePassword,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changePasswordCall: (data: IchangePasswordCallDdetails) =>
      dispatch(changePasswordCall(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
