import { store } from "../store";
import { IUserResponse } from "../commonTypes";
import { ISignInState } from "../components/user_profiles/createUser/CreateUserProfile.actionTypes";
import { categoryModules, superAdminRoutes } from "../utils/categoryModules";
import { getDeviceInfo } from "../utils/global";
import endpoint from "../apiUtil";
import api from "../api.json";
//import i18n from "./../i18n";
const _intersection = require("lodash.intersection");

export const grantModuleAccess = (module: string) => {
  const userData: IUserResponse = store.getState().user;
  const modules = userData.data && userData.data.modules;
  return modules && modules.indexOf(module) > -1;
};

export const getUserFromStore = () => {
  const userData: IUserResponse = store.getState().user;
  return userData.data;
};

export const getCompanyId = () => {
  const userData: IUserResponse = store.getState().user;
  return userData.data && userData.data.fk_company_id;
};

export const getUserId = () => {
  const userData: IUserResponse = store.getState().user;
  return userData.data && userData.data._id;
};

export const getCorporateAdminUserId = () => {
  const userData: any =
    store.getState().userProfile && store.getState().userProfile.signInInfoData;
  return userData._id;
};

export const getGroupId = () => {
  const userData: IUserResponse = store.getState().user;
  const signInUser: ISignInState =
    store.getState().userProfile && store.getState().userProfile.signInInfoData;
  return userData.data && userData.data.fk_group_id
    ? userData.data.fk_group_id
    : signInUser.fk_group_id;
};

export const isSuperAdmin = () => {
  const userData: IUserResponse = store.getState().user;
  return userData.data && userData.data.isSuperAdmin;
};

export const isCorporateAdmin = () => {
  const userData: IUserResponse = store.getState().user;
  return userData.data && userData.data.isCorporateAdmin;
};

export const isUserGroupAdmin = () => {
  const userData: IUserResponse = store.getState().user;
  return (
    userData.data &&
    userData.data.isGroupAdmin &&
    userData.data.isCorporateAdmin
  );
};

export const isGroupUser = () => {
  const userData: IUserResponse = store.getState().user;
  return (
    userData.data &&
    userData.data.isGroupAdmin &&
    !userData.data.isCorporateAdmin
  );
};

export const grantCategoryAccess = (category: string) => {
  const userData: IUserResponse = store.getState().user;
  if (userData.data) {
    if (userData.data.isSuperAdmin) {
      return superAdminRoutes.indexOf(category) > -1;
    } else {
      const modules = userData.data.modules;
      const categoryMod: string[] = categoryModules[category];
      return (
        modules &&
        category &&
        categoryMod &&
        _intersection(categoryMod, modules).length > 0
      );
    }
  } else {
    return null;
  }
};

export const getAuditData = () => {
  let data = { ...store.getState().auditData };
  let deviceInfo = getDeviceInfo();
  data["type"] =
    deviceInfo.device +
    "(v" +
    deviceInfo.deviceVersion +
    "), " +
    deviceInfo.browser +
    "(v" +
    deviceInfo.browserVersion +
    ")";
  const user: IUserResponse = store.getState().user;
  data.source = "Web";
  if (user && user.data && user.data._id) {
    data.fk_userId = user.data._id;
    data.isSuperAdmin = user.data.isSuperAdmin;
    if (!user.data.isGroupAdmin && !user.data.isSuperAdmin) {
      data.fk_companyId = user.data.fk_company_id;
    }
  }
  return data;
};

export const getLogs = (error?: any) => {
  return {
    ...getAuditData(),
    errorMessage: error && error.message,
    errorStack: error && error.stack,
    errorType: error && error.name,
    errorSource: "Web",
  };
};

export const postAPILogs = (
  apiUrl: string,
  apiHttpMethod: string,
  apiResponse: any,
  apiRequest?: any
) => {
  endpoint.post(api.appLogs, {
    ...getLogs(),
    apiUrl: process.env.BASE_URL + apiUrl,
    apiHttpMethod,
    apiRequest: apiRequest && apiRequest ? JSON.stringify(apiRequest) : "",
    apiResponse: JSON.stringify(apiResponse),
  });
};
