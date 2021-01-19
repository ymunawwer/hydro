import {
  LoginActionTypes,
  LoginReducerActions,
  loginType,
} from "./Login.actionTypes";
import { IUserResponse } from "../../commonTypes";

export const login_reducer = (
  state: IUserResponse = loginType,
  action: LoginReducerActions
) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN:
      return {
        // ...state,
        loading: true,
      };
    case LoginActionTypes.LOGIN_SUCCEEDED:
      return {
        loading: false,
        ...action.user,
        /* data: {
          ...action.user.data,
          twoStepVerification: false,
        }, */
      };

    case LoginActionTypes.LOGIN_FAILED: {
      return {
        loading: false,
        //...action.user,
        message:action.message
      };
    }
    case LoginActionTypes.RESET_USER: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};


