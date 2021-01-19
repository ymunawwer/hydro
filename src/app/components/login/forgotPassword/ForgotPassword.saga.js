import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { ForgotPasswordActionTypes } from "./ForgotPassword.actionTypes";
import api from "../../../api.json";
import history from "../../../history";

export function* getUserNameForgotPswd({ email }) {
  try {
    const res = yield axios.post(api.getUserNameForgotPswd, { email });
    if (res.data.success) {
      history.push(`/resetPassword/${res.data.encodedUserName}`);
      /*  yield put({
        type: ForgotPasswordActionTypes.GET_USR_NAME_SUCCESS,
        encodedUserName: res.data.encodedUserName,
      }); */
    } else {
      yield put({
        type: ForgotPasswordActionTypes.GET_USR_NAME_FAILED,
        message: res.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: ForgotPasswordActionTypes.GET_USR_NAME_FAILED,
    });
  }
}

export function* getUserNameForgotPswdWatcher() {
  yield takeLatest(
    ForgotPasswordActionTypes.GET_USR_NAME,
    getUserNameForgotPswd
  );
}
