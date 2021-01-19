import { IUserResponse, IDict } from "../../commonTypes";

export enum LogoutActionTypes {
  INITIAL_STATE = "INITIAL_STATE",
  LOGOUT = "LOGOUT",
  SESSION_TIMEOUT = "SESSION_TIMEOUT",
  LOGOUT_SUCCEEDED = "LOGOUT_SUCCEEDED",
  LOGOUT_FAILED = "LOGOUT_FAILED",
  RESET_LOGOUT = "RESET_LOGOUT",
  DESTROY_SESSION = "DESTROY_SESSION",
  CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
  ADD_TRANSLATION = "ADD_TRANSLATION",
  RESET_SESSION_TIMEOUT = "RESET_SESSION_TIMEOUT",
}
export interface ILogOutReducerState {
  sessionTimeout: boolean;
  langEn: IDict<string>;
  langAr: IDict<string>;
}

export interface ISuperUser {
  name?: string;
  email?: string;
}

export interface IReduxLogoutState {
  //userLogout: IUserResponse;
  user: IUserResponse;
  userLogout: ILogOutReducerState;
}

export const loginType = {
  loading: false,
  success: false,
  message: "",
};

export interface IReduxBaseAction {
  type: LogoutActionTypes;
}

export type LogoutReducerActions =
  | IReduxInitialStateAction
  | IReduxLogoutAction
  | IReduxLogoutSucceededAction
  | IReduxLogoutFailedAction
  | IReduxResetLogoutAction
  | IReduxSessionTimeoutAction
  | IAddTranslation
  | IReduxResetSessionTimeoutAction;

export interface IReduxInitialStateAction extends IReduxBaseAction {
  type: LogoutActionTypes.INITIAL_STATE;
}
export interface IReduxLogoutAction extends IReduxBaseAction {
  type: LogoutActionTypes.LOGOUT;
}
export interface IReduxLogoutSucceededAction extends IReduxBaseAction {
  type: LogoutActionTypes.LOGOUT_SUCCEEDED;
  userLogout: IUserResponse;
}

export interface IReduxLogoutFailedAction extends IReduxBaseAction {
  type: LogoutActionTypes.LOGOUT_FAILED;
  userLogout: IUserResponse;
}

export interface IReduxResetLogoutAction extends IReduxBaseAction {
  type: LogoutActionTypes.RESET_LOGOUT;
}

export interface IReduxSessionTimeoutAction extends IReduxBaseAction {
  type: LogoutActionTypes.SESSION_TIMEOUT;
}

export interface IAddTranslation extends IReduxBaseAction {
  type: LogoutActionTypes.ADD_TRANSLATION;
  data: IDict<string>;
  lang: string;
}
export interface IReduxResetSessionTimeoutAction extends IReduxBaseAction {
  type: LogoutActionTypes.RESET_SESSION_TIMEOUT;
}
