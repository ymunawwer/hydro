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
      history.push("/login");
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

export function* getLanguageMap(action) {
  try {
    if (process.env.NODE_ENV === "development" && Cookies.get("user")) {
      const user = JSON.parse(Cookies.get("user"));
      yield put({
        type: LoginActionTypes.LOGIN_SUCCEEDED,
        user: { success: true, data: user },
      });
      axiosInterceptor();
    }
    const res = yield call(endpoint.get, `${api.translation}/${action.lang}`);
    if (res.data.success) {
      yield put({
        type: LogoutActionTypes.ADD_TRANSLATION,
        data: res.data.data,
        lang: action.lang,
      });
    }
  } catch (err) {
    // yield put({
    //   type: LoginActionTypes.LOGIN_FAILED,
    // });
  }
}

export function* logoutUserWatcher() {
  yield takeLatest(LogoutActionTypes.LOGOUT, logoutUser);
}

export function* translateLang() {
  yield takeLatest(LogoutActionTypes.CHANGE_LANGUAGE, getLanguageMap);
}
