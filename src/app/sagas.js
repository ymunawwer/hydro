import { all } from "redux-saga/effects";

import {
  loginUserWatcher,
} from "./components/login/Login.saga";




export default function* rootSaga() {
  yield all([
    loginUserWatcher(),
  ]);
}
