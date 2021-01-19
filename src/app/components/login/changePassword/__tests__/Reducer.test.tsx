import { changePassword_reducer } from "../changePassword.reducer";
import {
  ChangePasswordActionTypes,
  defaultChangePswdState,
} from "../changePassword.actionTypes";

describe("CreateUserProfile  changePassword_reducer", () => {
  it("reducer action default", () => {
    expect(changePassword_reducer(undefined, { type: {} })).toEqual(
      defaultChangePswdState
    );
  });

  it("reducer action CHANGE_PASSWORD_CALL", () => {
    expect(
      changePassword_reducer(undefined, {
        type: ChangePasswordActionTypes.CHANGE_PASSWORD_CALL,
      })
    ).toEqual({
      loading: true,
    });
  });

  it("reducer action CHANGE_PWD_SUCCESS", () => {
    let resData = { status: "success" };
    expect(
      changePassword_reducer(undefined, {
        type: ChangePasswordActionTypes.CHANGE_PWD_SUCCESS,
        resData: resData,
      })
    ).toEqual({
      loading: false,
      showPwdScreen: true,
      ...resData,
    });
  });
});
