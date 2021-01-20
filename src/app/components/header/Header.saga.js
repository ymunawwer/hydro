import { put, takeLatest, call } from "redux-saga/effects";
import { LoginActionTypes } from "../login/Login.actionTypes";
import { LogoutActionTypes } from "./Header.actionTypes";
import * as Cookies from "js-cookie";
import history from "../../history";
import api from "../../api.json";
import endpoint from "../../apiUtil";
import { getAuditData, postAPILogs } from "../../utils/roleHelper";
import axiosInterceptor from "../login/axiosInterceptor";

export function* logoutUser(req) {
  let res = null;
  history.push("/login");

  let auditDetails = {
    ...getAuditData(),
    desc: "Logged out",
  };
  try {
    res = yield call(endpoint.get, api.logOutApi, {
      headers: { audit: JSON.stringify(auditDetails) },
    });
    if (res.data.success) {
      yield put({
        type: LoginActionTypes.RESET_USER,
      });

      Cookies.remove("user");
      yield put({
        type: LogoutActionTypes.LOGOUT_SUCCEEDED,
        userLogout: res.data,
      });
      axiosInterceptor();
      //history.push("/login");
    } else {
      yield put({
        type: LogoutActionTypes.LOGOUT_FAILED,
        userLogout: res.data,
      });
      //Failed API tracking
      postAPILogs(api.logOutApi, "get", res);
    }
  } catch (err) {
    yield put({
      type: LogoutActionTypes.LOGOUT_FAILED,
    });
    //Failed API tracking
    postAPILogs(api.logOutApi, "get", res);
  }
}


export function* logoutUserWatcher() {
  yield takeLatest(LogoutActionTypes.LOGOUT, logoutUser);
}

