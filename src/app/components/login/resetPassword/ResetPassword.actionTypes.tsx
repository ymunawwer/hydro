export enum ResetPasswordActionTypes {
  FETCH_USER_DETAILS = "FETCH_USER_DETAILS",
  FETCH_USER_DETAILS_SUCCESS = "FETCH_USER_DETAILS_SUCCESS",
  FETCH_USER_DETAILS_FAILED = "FETCH_USER_DETAILS_FAILED",
  RESET_PASSWORD_CALL = "RESET_PASSWORD_CALL",
  RESET_PWD_SUCCESS = "RESET_PWD_SUCCESS",
  RESET_PWD_FAILED = "RESET_PWD_FAILED",
}

export interface IResetPasswordCallDdetails {
  encodedUserName: string | null;
  newPassword: string;
  // currentPassword: string;
}

export const defaultResetPswdState = {
  email: "",
  phone: "",
  userId: "",
  continue: false,
  otpStatus: "",
  message: "",
  showPwdScreen: false,
};

export const defaultResetPswdValues: IResetPswdForm = {
  // newPassword: "",
  // currentPassword: "",
  confirmPassword: "",
};

export interface IResetPswdForm {
  //currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}
export interface IResetPswdState {
  status: string;
  message: string;
}

export type ChangePasswordReducerActions =
  | IChangePasswordAction
  | IChangePwdSuccessAction
  | IChangePwdDefaultTestAction;

export interface IChangePasswordAction {
  type: ChangePasswordActionTypes.CHANGE_PASSWORD_CALL;
}

export interface IChangePwdSuccessAction {
  type: ChangePasswordActionTypes.CHANGE_PWD_SUCCESS;
  resData: {};
}

export interface IChangePwdDefaultTestAction {
  type: {};
}
