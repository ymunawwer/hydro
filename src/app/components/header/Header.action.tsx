import { LogoutActionTypes } from "./Header.actionTypes";

export const logout = () => {
  return {
    type: LogoutActionTypes.LOGOUT,
  };
};
export const sessionTimeout = () => {
  return {
    type: LogoutActionTypes.SESSION_TIMEOUT,
  };
};

export const resetLogout = () => {
  return {
    type: LogoutActionTypes.RESET_LOGOUT,
  };
};

export const changeLanguage = (lang: string) => {
  return {
    type: LogoutActionTypes.CHANGE_LANGUAGE,
    lang,
  };
};
