import { put, takeLatest, call } from "redux-saga/effects";
import { LoginActionTypes } from "./Login.actionTypes";
import history from "../../history";
import api from "../../api.json";
import endpoint from "../../apiUtil";
import axiosInterceptor from "./axiosInterceptor";
import { grantModuleAccess, grantCategoryAccess } from "../../utils/roleHelper";
import { getAuditData } from "../../utils/roleHelper";
import * as Cookies from "js-cookie";
const cryptoLib = require("cryptlib");

export function* loginUser(req) {
  try {
    let res = null;
   /* const shaKey = cryptoLib.getHashSha256(process.env.APP_KEY, 32);
    let authkey = cryptoLib.encrypt(
      req.payload.userName,
      shaKey,
      process.env.APP_IV
    );
    if (req.payload.password) {
      let auditDetails = { ...getAuditData(), desc: "Logged in" };
      res = yield call(endpoint.post, api.login, req.payload, {
        headers: { authkey: authkey, audit: JSON.stringify(auditDetails) },
      });
    } */

      res = yield call(endpoint.post, api.login, req.payload);
    if (res.data.success) {
            history.push("/dashboard");
           
        yield put({ type: LoginActionTypes.LOGIN_SUCCEEDED, user: res.data });
        axiosInterceptor();
      
    } else {
      yield put({ type: LoginActionTypes.LOGIN_FAILED, message:"Invalid credentials" });
    }
  } catch (err) {
    yield put({
      type: LoginActionTypes.LOGIN_FAILED,
    });
  }
}


export function* loginUserWatcher() {
  yield takeLatest(LoginActionTypes.LOGIN, loginUser);
}


