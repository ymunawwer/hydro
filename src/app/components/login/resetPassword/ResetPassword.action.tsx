import { ResetPasswordActionTypes } from "./ResetPassword.actionTypes";

export const fetch_UserDetails = (encodedUserName: string) => {
  return {
    type: ResetPasswordActionTypes.FETCH_USER_DETAILS,
    encodedUserName,
  };
};
export const reset_PasswordCall = (payload: any) => {
  return {
    type: ResetPasswordActionTypes.RESET_PASSWORD_CALL,
    payload,
  };
};
