export enum ForgotUserIdActionTypes {
  GET_USR_ID = "GET_USR_ID",
  GET_USR_ID_SUCCESS = "GET_USR_ID_SUCCESS",
  GET_USR_ID_FAILED = "GET_USR_ID_FAILED",
}

export interface IForgotUserIdRequest {
  email: string;
  lang: string;
}

export interface IForgotUserIdResponse {
  status: boolean;
  message: string;
}

export interface IForgotUserIdReduxState {
  forgotUserId: IForgotUserIdResponse;
  message: string;
}

export type ForgotUserIdReducerActions =
  | IChangeUserIdAction
  | IChangeUserIdSuccessAction
  | IChangeUserIdFailedAction;

export interface IChangeUserIdAction {
  type: ForgotUserIdActionTypes.GET_USR_ID;
}

export interface IChangeUserIdSuccessAction {
  type: ForgotUserIdActionTypes.GET_USR_ID_SUCCESS;
  payload: IForgotUserIdResponse;
}

export interface IChangeUserIdFailedAction {
  type: ForgotUserIdActionTypes.GET_USR_ID_FAILED;
  message: string;
}
