import { connect } from "react-redux";
import { Dispatch } from "redux";
import ForgotUserId from "./ForgotUserId.component";
import { getUserNameForgotUserId } from "./ForgotUserId.action";
import { IForgotUserIdRequest } from './ForgotUserId.actionTypes';

export const mapStateToProps = (state: any) => {
  return {
    forgotUserIdResponse: state.forgotUserIdReducer.forgotUserId,
    message: state.forgotUserIdReducer.message,
    loading: state.forgotUserIdReducer.loading,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUserNameForgotUserId: (data: IForgotUserIdRequest) =>
      dispatch(getUserNameForgotUserId(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotUserId);
