import {
  IFundTransferLimit,
  IModulesCategory,
} from "../user_profiles/user_management/UserManagement.actionTypes";
import { ILogOutReducerState } from "../header/Header.actionTypes";
import { IForgotUserIdReduxState } from "./forgotUserId/ForgotUserId.actionTypes";
import { ICompanyValue } from "../../components/user_profiles/createUser/CreateUserProfile.actionTypes";

export enum LoginActionTypes {
  INITIAL_STATE = "INITIAL_STATE",
  LOGIN = "LOGIN",
  TWO_STEP_AUTH = "TWO_STEP_AUTH",
  LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED",
  LOGIN_FAILED = "LOGIN_FAILED",
  RESET_USER = "RESET_USER",
  AUDIT_DATA = "AUDIT_DATA",
  AUDIT_DATA_SUCCEDDED = "AUDIT_DATA_SUCCEDDED",
  AUDIT_DATA_FAILED = "AUDIT_DATA_FAILED",
}

export interface IUserResponse {
  loading?: boolean;
  success: boolean;
  message?: string;
  data: IUserDetails;
}

export interface IReduxLoginState {
  user: IUserResponse;
  userLogout: ILogOutReducerState;
  forgotUserIdReducer: IForgotUserIdReduxState;
  auditData: any;
}

export interface IUserDetails {
  _id: string;
  userName?: string;
  password?: string;
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  roleId?: string;
  nationalId?: string;
  twoStepVerification?: boolean;
  fundTransferLimit?: IFundTransferLimit;
  modulesCategory: IModulesCategory[];
  device?: string;
  browser?: string;
  source_type?: string;
  ipAddress?: string;
  isSuperAdmin?: boolean;
  isCorporateAdmin?: boolean;
  isGroupAdmin?: boolean;
  modules?: string[];
  fk_company_id: string[];
  fk_group_id?: string;
  createdBy?: string;
  createdDate?: Date;
  modifiedBy?: string;
  modifiedDate?: Date;
  accessToken?: string;
  company?: ICompanyValue;
}

export const loginType: IUserResponse = {
  loading: false,
  success: false,
  message: "",
  data: {
    _id: "",
    userName: "",
    password: "",
    name: "",
    email: "",
    countryCode: "",
    phone: "",
    roleId: "",
    nationalId: "",
    fundTransferLimit: {
      currency: "",
      amount: 0,
    },
    modulesCategory: [
      {
        categoryId: "",
        modules: [
          {
            moduleId: "",
            workflow: "",
          },
        ],
      },
    ],
    fk_company_id: [],
    twoStepVerification: false,
  },
};

export interface IReduxBaseAction {
  type: LoginActionTypes;
}

export type LoginReducerActions =
  | IReduxInitialStateAction
  | IReduxLoginAction
  | IReduxLoginSucceededAction
  | IReduxLoginFailedAction
  | IReduxAuditAction
  | IReduxAuditSucceededAction
  | IReduxAuditFailedAction
  | IReduxResetUserAction;

export interface IReduxInitialStateAction extends IReduxBaseAction {
  type: LoginActionTypes.INITIAL_STATE;
}

export interface IReduxLoginAction extends IReduxBaseAction {
  type: LoginActionTypes.LOGIN;
}
export interface IReduxLoginSucceededAction extends IReduxBaseAction {
  type: LoginActionTypes.LOGIN_SUCCEEDED;
  user: IUserDetails;
}

export interface IReduxLoginFailedAction extends IReduxBaseAction {
  type: LoginActionTypes.LOGIN_FAILED;
  user: IUserDetails;
}

export interface IReduxAuditAction extends IReduxBaseAction {
  type: LoginActionTypes.AUDIT_DATA;
}
export interface IReduxAuditSucceededAction extends IReduxBaseAction {
  type: LoginActionTypes.AUDIT_DATA_SUCCEDDED;
  auditData: any;
}

export interface IReduxAuditFailedAction extends IReduxBaseAction {
  type: LoginActionTypes.AUDIT_DATA_FAILED;
  auditData: any;
}

export interface IReduxResetUserAction extends IReduxBaseAction {
  type: LoginActionTypes.RESET_USER;
}
