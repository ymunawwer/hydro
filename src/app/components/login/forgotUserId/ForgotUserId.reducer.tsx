import {
  ForgotUserIdActionTypes,
  ForgotUserIdReducerActions,
  IForgotUserIdResponse,
} from "./ForgotUserId.actionTypes";

export const forgotUserId_reducer = (
  state: { forgotUserId: IForgotUserIdResponse; message: string } = {
    forgotUserId: { status: false, message: "" },
    message: "",
  },
  action: ForgotUserIdReducerActions
) => {
  switch (action.type) {
    case ForgotUserIdActionTypes.GET_USR_ID:
      return {
        ...state,
        loading: true,
      };

    case ForgotUserIdActionTypes.GET_USR_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserId: action.payload,
      };
    case ForgotUserIdActionTypes.GET_USR_ID_FAILED:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    default:
      return state;
  }
};
