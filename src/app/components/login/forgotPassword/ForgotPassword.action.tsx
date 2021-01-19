import { ForgotPasswordActionTypes } from "./ForgotPassword.actionTypes";

export const getUserNameForgotPswd = (email: string) => {
  return {
    type: ForgotPasswordActionTypes.GET_USR_NAME,
    email,
  };
};
