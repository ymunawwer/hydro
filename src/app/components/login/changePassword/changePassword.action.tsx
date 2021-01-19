import {
  ChangePasswordActionTypes,
  IchangePasswordCallDdetails,
} from "./changePassword.actionTypes";

export const changePasswordCall = (data: IchangePasswordCallDdetails) => {
  return {
    type: ChangePasswordActionTypes.CHANGE_PASSWORD_CALL,
    payload: data,
  };
};
