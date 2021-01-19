import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { ResetPasswordActionTypes } from "./ResetPassword.actionTypes";
import api from "../../../api.json";

export function* fetchUserDetails(req) {
  try {
    const res = yield axios.post(api.fetchResetPwdUsr, {
      encodedUserName: req.encodedUserName,
    });
    res.data.success
      ? yield put({
          type: ResetPasswordActionTypes.FETCH_USER_DETAILS_SUCCESS,
          user: res.data.user,
        })
      : yield put({
          type: ResetPasswordActionTypes.FETCH_USER_DETAILS_FAILED,
          message: res.data.message,
        });
  } catch (err) {
    yield put({
      type: ResetPasswordActionTypes.FETCH_USER_DETAILS_FAILED,
      message: "frontend error",
    });
  }
}

export function* resetPasswordCall(req) {
  try {
    const res = yield axios.post(api.resetPassword, req.payload);
    res.data.success
      ? yield put({
          type: ResetPasswordActionTypes.RESET_PWD_SUCCESS,
          resData: res.data,
        })
      : yield put({
          type: ResetPasswordActionTypes.RESET_PWD_FAILED,
          message: res.data.message,
        });
  } catch (err) {
    yield put({
      type: ResetPasswordActionTypes.RESET_PWD_FAILED,
      message: "frontend error",
    });
  }
}

export function* resetPasswordWatcher() {
  yield takeLatest(
    ResetPasswordActionTypes.RESET_PASSWORD_CALL,
    resetPasswordCall
  );
}

export function* fetchUserDetailsWatcher() {
  yield takeLatest(
    ResetPasswordActionTypes.FETCH_USER_DETAILS,
    fetchUserDetails
  );
}
