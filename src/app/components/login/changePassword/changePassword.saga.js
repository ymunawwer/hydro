import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { ChangePasswordActionTypes } from "./changePassword.actionTypes";
import api from "../../../api.json";

export function* changePasswordCall(req) {
  try {
    const res = yield axios.post(api.changePassword, req.payload);
    yield put({
      type: ChangePasswordActionTypes.CHANGE_PWD_SUCCESS,
      resData: res.data,
    });
  } catch (err) {
    yield put({
      type: ChangePasswordActionTypes.CHANGE_PWD_SUCCESS,
    });
  }
}

export function* changePasswordWatcher() {
  yield takeLatest(
    ChangePasswordActionTypes.CHANGE_PASSWORD_CALL,
    changePasswordCall
  );
}
