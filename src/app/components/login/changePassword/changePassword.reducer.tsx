import {
  ChangePasswordActionTypes,
  ChangePasswordReducerActions,
  defaultChangePswdState,
} from "./changePassword.actionTypes";

export const changePassword_reducer = (
  state: {} = defaultChangePswdState,
  action: ChangePasswordReducerActions
) => {
  switch (action.type) {
    case ChangePasswordActionTypes.CHANGE_PASSWORD_CALL:
      return {
        loading: true,
      };

    case ChangePasswordActionTypes.CHANGE_PWD_SUCCESS:
      return {
        loading: false,
        showPwdScreen: true,
        ...action.resData,
      };
    default:
      return state;
  }
};
