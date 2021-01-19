import {
  ForgotPasswordActionTypes,
  ForgotPasswordReducerActions,
} from "./ForgotPassword.actionTypes";

export const forgotPassword_reducer = (
  state: { encodedUserName: string } = { encodedUserName: "" },
  action: ForgotPasswordReducerActions
) => {
  switch (action.type) {
    case ForgotPasswordActionTypes.GET_USR_NAME:
      return {
        loading: true,
      };

    case ForgotPasswordActionTypes.GET_USR_NAME_SUCCESS:
      return {
        loading: false,
        encodedUserName: action.encodedUserName,
        // showPwdScreen: true,
        //  ...action.resData,
      };
    case ForgotPasswordActionTypes.GET_USR_NAME_FAILED:
      return {
        loading: false,
        message: action.message,
      };
    default:
      return state;
  }
};
