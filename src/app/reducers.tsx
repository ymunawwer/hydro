import { combineReducers } from "redux";
import { LogoutActionTypes } from "./components/header/Header.actionTypes";
import {
  login_reducer,
} from "./components/login/Login.reducer";
import {
  getBeneficiariesData_reducer,
  AllBeneficiaries_reducer,
  Submitmore_reducer,
  getBeneficiaryCount_reducer,
  addApproveData_reducer,
  addRejectData_reducer,
  addInfoData_reducer,
  ViewMore_reducer,
  create_beneficiary_reducer,
  getBanksMaster_reducer,
  getGroupLevel_reducer,
  beneficiaryType_reducer,
  Edit_Beneficiary_reducer,
} from "./components/beneficiaries/Beneficiaries.reducer";

import { logout_reducer } from "./components/header/Header.reducer";

import { changePassword_reducer } from "./components/login/changePassword/changePassword.reducer";

import { resetPassword_reducer } from "./components/login/resetPassword/ResetPassword.reducer";
import { forgotPassword_reducer } from "./components/login/forgotPassword/ForgotPassword.reducer";
import { forgotUserId_reducer } from "./components/login/forgotUserId/ForgotUserId.reducer";



// Combine all reducers.
const reducers = combineReducers({
  user: login_reducer,
  beneficiaries: combineReducers({
    GetBeneficiariesData: getBeneficiariesData_reducer,
    AllBeneficiaries: AllBeneficiaries_reducer,
    AddSubmitComments: Submitmore_reducer,
    getBeneficiaryCount: getBeneficiaryCount_reducer,
    createBeneficiary: create_beneficiary_reducer,
    ViewComments: ViewMore_reducer,
    AddApproveComments: addApproveData_reducer,
    AddRejectComments: addRejectData_reducer,
    AddInfoComments: addInfoData_reducer,
    banks: getBanksMaster_reducer,
    GetGroupUsers: getGroupLevel_reducer,
    AllEditedBeneficiaries: Edit_Beneficiary_reducer,
    beneficiaries: beneficiaryType_reducer,
  }),
  userLogout: logout_reducer,
  changePassword: changePassword_reducer,
  resetPassword: resetPassword_reducer,
  forgotPswd: forgotPassword_reducer,
  forgotUserIdReducer: forgotUserId_reducer,
});

export const rootReducer = (state: any, action: any) => {
  // Clear all data in redux store to initial.
  if (action.type === LogoutActionTypes.DESTROY_SESSION) {
    if (state.userLogout && state.userLogout.sessionTimeout) {
      state = { userLogout: state.userLogout };
    } else {
      state = undefined;
    }
  }
  return reducers(state, action);
};
