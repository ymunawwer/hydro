import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { ForgotUserIdActionTypes } from "./ForgotUserId.actionTypes";
import api from "../../../api.json";

export function* getUserNameForgotUserId({ data }) {
  try {
    const { email, lang } = data;
    const res = yield axios.post(api.getUserNameForgotUserId, { email, lang });

    if (res.data.status) {
      yield put({
        type: ForgotUserIdActionTypes.GET_USR_ID_SUCCESS,
        payload: res.data,
      });
    } else {
      yield put({
        type: ForgotUserIdActionTypes.GET_USR_ID_FAILED,
        message: "Request Denied. Invalid Email id.",
      });
    }
  } catch (err) {
    yield put({
      type: ForgotUserIdActionTypes.GET_USR_ID_FAILED,
      message: err.message,
    });
  }
}

export function* getUserNameForgotUserIdWatcher() {
  yield takeLatest(ForgotUserIdActionTypes.GET_USR_ID, getUserNameForgotUserId);
}
