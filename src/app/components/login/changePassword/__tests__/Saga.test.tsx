import { put, takeLatest } from "redux-saga/effects";
import {
  changePasswordWatcher,
  changePasswordCall,
} from "../changePassword.saga";
import {
  ChangePasswordActionTypes,
  defaultChangePswdState,
} from "../changePassword.actionTypes";

describe("<changePassword /> saga", () => {
  it('changePassword saga dispatch action "SAVE_COMPANY_INFO" ', () => {
    const generator = changePasswordWatcher();
    expect(generator.next().value).toEqual(
      takeLatest(
        ChangePasswordActionTypes.CHANGE_PASSWORD_CALL,
        changePasswordCall
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('changePassword saga dispatch action "CHANGE_PWD_SUCCESS"', () => {
    const mockResponse: any = { resData: { data: {} } };

    const generator = changePasswordCall({ payload: {} });

    generator.next();

    const response = { data: { data: mockResponse }, success: true },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      ChangePasswordActionTypes.CHANGE_PWD_SUCCESS;

    expect(nextResponse).toEqual(
      put({
        type: ChangePasswordActionTypes.CHANGE_PWD_SUCCESS,
        resData: { data: mockResponse },
        // ...mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  });

  /* it('CreateUserProfile saga dispatch action "SAVE_COMPANY_INFO_FAILED"', () => {
    const mockResponse: any = [];

    const generator = saveCompanyInfo({
      payload: defaultCompanyInfoState,
    });

    generator.next();

    const response = { data: { data: mockResponse }, success: false },
      nextResponse: any = generator.next(response).value;

    nextResponse.payload.action.type =
      CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED;

    expect(nextResponse).toEqual(
      put({
        type: CreateUserProfileActionTypes.SAVE_COMPANY_INFO_FAILED,
        saveCompanyInfo: mockResponse,
      })
    );

    expect(generator.next().done).toBeTruthy();
  }); */

  it("changePasswordCall on error thrown", () => {
    const generator = changePasswordCall({
      payload: {},
    });

    generator.next();

    const nextResponse = generator.throw("error");

    // const nextResponse = generator.next().value;

    expect(nextResponse.value).toEqual(
      put({
        type: ChangePasswordActionTypes.CHANGE_PWD_SUCCESS,
      })
    );
  });
});
