import { changePasswordCall } from "../changePassword.action";
import {
  ChangePasswordActionTypes,
  IchangePasswordCallDdetails,
} from "../changePassword.actionTypes";

describe("changePassword  action js", () => {
  it("changePasswordCall action", () => {
    const mockData: IchangePasswordCallDdetails = {
      encodedEmailId: "teja@onesingleview.com",
      newPassword: "hello",
      currentPassword: "hello",
    };
    const expectedAction = {
      type: ChangePasswordActionTypes.CHANGE_PASSWORD_CALL,
      payload: mockData,
    };
    expect(changePasswordCall(mockData)).toEqual(expectedAction);
  });
});
