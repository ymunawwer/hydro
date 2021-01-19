import {
  ResetPasswordActionTypes,
  ChangePasswordReducerActions,
  defaultResetPswdState,
} from "./ResetPassword.actionTypes";

export const resetPassword_reducer = (
  state: {} = defaultResetPswdState,
  action: ChangePasswordReducerActions
) => {
  switch (action.type) {
    case ResetPasswordActionTypes.FETCH_USER_DETAILS:
      /*  return {
        loading: true,
      }; */
      return {
        ...state,
        userName: action.encodedUserName,
      };
    case ResetPasswordActionTypes.FETCH_USER_DETAILS_SUCCESS:
      return {
        //loading: false,
        ...state,
        ...action.user,
      };
    case ResetPasswordActionTypes.RESET_PASSWORD_CALL:
      return {
        ...state,
        loading: true,
      };

    case ResetPasswordActionTypes.RESET_PWD_SUCCESS:
      return {
        ...state,
        loading: false,
        showPwdScreen: true,
        // ...action.resData,
        status: "success",
      };
    case ResetPasswordActionTypes.RESET_PWD_FAILED:
      return {
        ...state,
        loading: false,
        //   showPwdScreen: true,
        // ...action.resData,
        status: "failed",
        message: action.message,
      };
    default:
      return state;
  }
};
