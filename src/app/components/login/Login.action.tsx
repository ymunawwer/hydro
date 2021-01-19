import {
  LoginActionTypes,
  IUserDetails,
  auditdetails,
} from "./Login.actionTypes";

export const login = (user: IUserDetails) => {
  return {
    type: LoginActionTypes.LOGIN,
    payload: user,
  };
};

/* export const reset_user = () => {
  return {
    type: LoginActionTypes.RESET_USER,
  };
}; */
