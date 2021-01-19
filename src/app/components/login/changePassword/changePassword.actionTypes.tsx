export enum ChangePasswordActionTypes {
  CHANGE_PASSWORD_CALL = "CHANGE_PASSWORD_CALL",
  CHANGE_PWD_SUCCESS = "CHANGE_PWD_SUCCESS",
}

export interface IchangePasswordCallDdetails {
  encodedUserName: string | null;
  newPassword: string;
  currentPassword: string;
}

export const defaultChangePswdState = { showPwdScreen: false };

export const defaultChangePswdValues: IChangePswdForm = {
  newPassword: "",
  currentPassword: "",
  confirmPassword: "",
};

export interface IChangePswdForm {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
}
export interface IChangePswdState {
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
