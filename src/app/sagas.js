import { all } from "redux-saga/effects";

import {
  loginUserWatcher,
} from "./components/login/Login.saga";

import {
  getBeneficiariesDataWatcher,
  getBeneficiaryBankCountWatcher,
  addInfoDataWatcher,
  addViewDataWatcher,
  addRejectDataWatcher,
  addApproveDataWatcher,
  createBeneficiaryWatcher,
  SubmitInfoDataWatcher,
  GroupLevelUsersWatcher,
  getBeneficiaryEditWatcher,
  AllBeneficiariesWatcher,
  getMasterBanksWatcher,
} from "./components/beneficiaries/Beneficiaries.saga";

import { changePasswordWatcher } from "./components/login/changePassword/changePassword.saga";
import { fetchUserDetailsWatcher } from "./components/login/resetPassword/ResetPassword.saga";
import { resetPasswordWatcher } from "./components/login/resetPassword/ResetPassword.saga";
import { getUserNameForgotPswdWatcher } from "./components/login/forgotPassword/ForgotPassword.saga";
import { getUserNameForgotUserIdWatcher } from "./components/login/forgotUserId/ForgotUserId.saga";
import {
  logoutUserWatcher,
  translateLang,
} from "./components/header/Header.saga";




export default function* rootSaga() {
  yield all([
    loginUserWatcher(),
    getBeneficiariesDataWatcher(),
    getBeneficiaryBankCountWatcher(),
    addInfoDataWatcher(),
    addViewDataWatcher(),
    addRejectDataWatcher(),
    addApproveDataWatcher(),
    changePasswordWatcher(),
    resetPasswordWatcher(),
    getUserNameForgotPswdWatcher(),
    getUserNameForgotUserIdWatcher(),
    logoutUserWatcher(),
    createBeneficiaryWatcher(),
    SubmitInfoDataWatcher(),
    GroupLevelUsersWatcher(),
    getMasterBanksWatcher(),
    getBeneficiaryEditWatcher(),
    AllBeneficiariesWatcher(),
    fetchUserDetailsWatcher(),
    translateLang(),
  ]);
}
