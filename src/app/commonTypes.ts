import {
    IFundTransferLimit,
    IModulesCategory,
  } from "./components/user_profiles/user_management/UserManagement.actionTypes";
export interface IDict<T> {
    [key: string]: T
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
}

export interface IUserResponse {
    loading?: boolean;
    success: boolean;
    message?: string;
    data: IUserDetails;
  }
