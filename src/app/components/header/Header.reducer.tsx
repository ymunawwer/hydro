import {
  LogoutActionTypes,
  LogoutReducerActions,
  ILogOutReducerState,
} from "./Header.actionTypes";

export const logout_reducer = (
  state: ILogOutReducerState = { sessionTimeout: false, langAr: {}, langEn: {} },
  action: LogoutReducerActions
) => {
  switch (action.type) {
    case LogoutActionTypes.LOGOUT:
      return {
        ...state,
        loading: true,
      };
    case LogoutActionTypes.SESSION_TIMEOUT:
      return {
        ...state,
        sessionTimeout: true,
      };
    case LogoutActionTypes.RESET_SESSION_TIMEOUT:
      return {
        sessionTimeout: false,
      };
    case LogoutActionTypes.LOGOUT_SUCCEEDED:
      return {
        ...state,
        loading: false,
        ...action.userLogout,
      };
    case LogoutActionTypes.LOGOUT_FAILED: {
      return {
        ...state,
        loading: false,
        ...action.userLogout,
      };
    }
    case LogoutActionTypes.RESET_LOGOUT: {
      return {
        loading: false,
      };
    }
    case LogoutActionTypes.ADD_TRANSLATION: {
      const locale = action.lang === 'ar' ? { langAr: action.data }: { langEn: action.data }
      return {
        ...state,
        ...locale
      }
    }
    default:
      return state;
  }
};
