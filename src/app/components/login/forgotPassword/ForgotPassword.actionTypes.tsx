export enum ForgotPasswordActionTypes {
  GET_USR_NAME = "GET_USR_NAME",
  GET_USR_NAME_SUCCESS = "GET_USR_NAME_SUCCESS",
  GET_USR_NAME_FAILED = "GET_USR_NAME_FAILED",
}

export type ForgotPasswordReducerActions =
  | IChangePasswordAction
  | IChangePwdSuccessAction;

export interface IChangePasswordAction {
  type: ForgotPasswordActionTypes.GET_USR_NAME;
}

export interface IChangePwdSuccessAction {
  type: ForgotPasswordActionTypes.GET_USR_NAME_SUCCESS;
  encodedUserName: string;
}
