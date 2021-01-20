import { all } from "redux-saga/effects";

import {
  loginUserWatcher
} from "./components/login/Login.saga";

import {
  logoutUserWatcher
} from "./components/header/Header.saga";



export default function* rootSaga() {
  yield all([
    loginUserWatcher(),
    logoutUserWatcher(),
  ]);
}
