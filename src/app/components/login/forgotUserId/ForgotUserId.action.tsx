import { ForgotUserIdActionTypes, IForgotUserIdRequest } from "./ForgotUserId.actionTypes";

export const getUserNameForgotUserId = (data: IForgotUserIdRequest) => {
  return {
    type: ForgotUserIdActionTypes.GET_USR_ID,
    data,
  };
};
