import { put, takeLatest, call } from "redux-saga/effects";
import { AllBeneficiariesActionTypes } from "./Beneficiaries.actionTypes";
import api from "../../api.json";
import endpoint from "../../apiUtil";
import axios from "axios";
import { getUserId, getAuditData, postAPILogs } from "../../utils/roleHelper";
export function* getBeneficiariesBanksCount(req) {
  let res = null;
  try {
    req &&
      req.user &&
      // (res = yield call(
      //   endpoint.post,
      //   api.beneficiaries + "/" + req.payload.user
      // ));
      (res = yield call(endpoint.post, api.getBeneficiariesTopMenu, req.user));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.BENEFICIARY_COUNT_SUCCEEDED,
        getBeneficiaryCount: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.BENEFICIARY_COUNT_FAILED,
        getBeneficiaryCount: res.data,
      });
      postAPILogs(api.getBeneficiariesTopMenu, "post", res, req.user);
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.BENEFICIARY_COUNT_FAILED,
    });
    postAPILogs(api.getBeneficiariesTopMenu, "post", res, req.user);
  }
}

export function* getAllBeneficiaries(req) {
  let res = null;

  let auditDetails = {
    ...getAuditData(),
    desc:
      req.payload.user.myApproval === false
        ? "All Beneficiaries"
        : "Pending Beneficiaries",
    //fk_companyId: [req.companyId],
  };
  try {
    req &&
      req.payload &&
      (res = yield call(
        endpoint.post,
        api.beneficiaries + "/" + req.payload.page + "/" + req.payload.pageSize,

        req.payload.user,
        {
          headers: { audit: JSON.stringify(auditDetails) },
        }
      ));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA_SUCCEEDED,
        GetBeneficiariesData: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA_FAILED,
        GetBeneficiariesData: res.data,
      });
      postAPILogs(
        api.beneficiaries + "/" + req.payload.page + "/" + req.payload.pageSize,
        "post",
        res,
        req.payload.user
      );
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA_FAILED,
    });
    postAPILogs(
      api.beneficiaries + "/" + req.payload.page + "/" + req.payload.pageSize,
      "post",
      res,
      req.payload.user
    );
  }
}

export function* getBeneficiariesDataWatcher() {
  yield takeLatest(
    AllBeneficiariesActionTypes.BENEFICIARIES_DATA,
    getAllBeneficiaries
  );
}

export function* getBeneficiaryBankCountWatcher() {
  yield takeLatest(
    AllBeneficiariesActionTypes.BENEFICIARY_COUNT,
    getBeneficiariesBanksCount
  );
}
export function* addApproveComments(req) {
  let res = null;

  try {
    let auditDetails = {
      ...getAuditData(),
      desc: "Approved Beneficiary",
    };
    req &&
      req.payload &&
      (res = yield call(
        endpoint.post,
        api.beneficiariesApprovalFlow,

        req.payload.values,
        {
          headers: { audit: JSON.stringify(auditDetails) },
        }
      ));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA_SUCCEEDED,
        AddApproveComments: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA_FAILED,
        AddApproveComments: res.data,
      });
      postAPILogs(
        api.beneficiariesApprovalFlow,
        "post",
        res,
        req.payload.values
      );
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA_FAILED,
    });
    postAPILogs(api.beneficiariesApprovalFlow, "post", res, req.payload.values);
  }
}

export function* addApproveDataWatcher() {
  yield takeLatest(
    AllBeneficiariesActionTypes.ADD_APPROVE_DATA,
    addApproveComments
  );
}

export function* addRejectData(req) {
  let res = null;

  try {
    req &&
      req.payload &&
      (res = yield call(
        endpoint.post,
        api.beneficiariesApprovalFlow,

        req.payload.values
      ));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.ADD_REJECT_DATA_SUCCEEDED,
        AddRejectComments: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.ADD_REJECT_DATA_FAILED,
        AddRejectComments: res.data,
      });
      postAPILogs(
        api.beneficiariesApprovalFlow,
        "post",
        res,
        req.payload.values
      );
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.ADD_REJECT_DATA_FAILED,
    });
    postAPILogs(api.beneficiariesApprovalFlow, "post", res, req.payload.values);
  }
}

export function* addRejectDataWatcher() {
  yield takeLatest(AllBeneficiariesActionTypes.ADD_REJECT_DATA, addRejectData);
}

export function* addAllInfo(req) {
  let res = null;

  try {
    req &&
      req.payload &&
      (res = yield call(
        endpoint.post,
        api.beneficiariesApprovalFlow,

        req.payload.values
      ));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.ADD_INFO_DATA_SUCCEEDED,
        AddInfoComments: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.ADD_INFO_DATA_FAILED,
        AddInfoComments: res.data,
      });
      postAPILogs(
        api.beneficiariesApprovalFlow,
        "post",
        res,
        req.payload.values
      );
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.ADD_INFO_DATA_FAILED,
    });
    postAPILogs(api.beneficiariesApprovalFlow, "post", res, req.payload.values);
  }
}

export function* addInfoDataWatcher() {
  yield takeLatest(AllBeneficiariesActionTypes.ADD_INFO_DATA, addAllInfo);
}

export function* viewMore(req) {
  let res = null;

  try {
    req &&
      req.viewInfo &&
      (res = yield call(endpoint.post, api.viewBeneficiary, req.viewInfo));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.ADD_VIEW_DATA_SUCCEEDED,
        ViewComments: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.ADD_VIEW_DATA_FAILED,
        ViewComments: res.data,
      });
      postAPILogs(api.viewBeneficiary, "post", res, req.viewInfo);
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.ADD_VIEW_DATA_FAILED,
    });
    postAPILogs(api.viewBeneficiary, "post", res, req.viewInfo);
  }
}

export function* addViewDataWatcher() {
  yield takeLatest(AllBeneficiariesActionTypes.ADD_VIEW_DATA, viewMore);
}

export function* createBeneficiary(req) {
  let res = null;
  let auditDetails = {
    ...getAuditData(),
    desc: "Created a beneficiary",
  };
  try {
    res = yield call(endpoint.post, api.createBeneficiary, req.beneficiary, {
      headers: { audit: JSON.stringify(auditDetails) },
    });

    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY_SUCCEEDED,
        GetCreateBeneficiariesData: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY_FAILED,
        GetCreateBeneficiariesData: res.data,
      });
      postAPILogs(api.createBeneficiary, "post", res, req.beneficiary);
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY_FAILED,
    });
    postAPILogs(api.createBeneficiary, "post", res, req.beneficiary);
  }
}
export function* createBeneficiaryWatcher() {
  yield takeLatest(
    AllBeneficiariesActionTypes.CREATE_BENEFICIARY,
    createBeneficiary
  );
}
export function* getMasterBanks() {
  let res = null;
  let auditDetails = {
    ...getAuditData(),
    desc: "Add beneficiary",
  };
  try {
    res = yield call(endpoint.get, api.masterBanks, {
      headers: { audit: JSON.stringify(auditDetails) },
    });
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.GET_MASTER_BANKS_SUCCEEDED,
        banks: res.data.banks,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.GET_MASTER_BANKS_FAILED,
        banks: res.data.banks,
      });
      postAPILogs(api.masterBanks, "get", res);
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.GET_MASTER_BANKS_FAILED,
    });
    postAPILogs(api.masterBanks, "get", res);
  }
}

export function* getMasterBanksWatcher() {
  yield takeLatest(
    AllBeneficiariesActionTypes.GET_MASTER_BANKS,
    getMasterBanks
  );
}

export function* SubmitInfo(req) {
  let res = null;

  try {
    req &&
      req.payload &&
      (res = yield call(
        endpoint.post,
        api.beneficiariesApprovalFlow,

        req.payload.values
      ));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_SUCCEEDED,
        AddSubmitComments: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_FAILED,
        AddSubmitComments: res.data,
      });
      postAPILogs(
        api.beneficiariesApprovalFlow,
        "post",
        res,
        req.payload.values
      );
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_FAILED,
    });
    postAPILogs(api.beneficiariesApprovalFlow, "post", res, req.payload.values);
  }
}

export function* SubmitInfoDataWatcher() {
  yield takeLatest(AllBeneficiariesActionTypes.SUBMIT_INFO_DATA, SubmitInfo);
}

export function* GroupLevelUsers(req) {
  let res = null;

  try {
    req &&
      req.user &&
      (res = yield call(
        endpoint.post,
        api.getGroupUsers,

        req.user
      ));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.GROUP_USERS_SUCCEEDED,
        GetGroupUsers: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.GROUP_USERS_FAILED,
        GetGroupUsers: res.data,
      });
      postAPILogs(api.getGroupUsers, "post", res, req.user);
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.GROUP_USERS_FAILED,
    });
    postAPILogs(api.getGroupUsers, "post", res, req.user);
  }
}

export function* GroupLevelUsersWatcher() {
  yield takeLatest(AllBeneficiariesActionTypes.GROUP_USERS, GroupLevelUsers);
}

export function* handlePendingEdit(req) {
  let res = null;
  let auditDetails = {
    ...getAuditData(),
    desc: "Edited Beneficiary",
  };
  try {
    res = yield call(
      endpoint.put,
      api.beneficiaries + "/" + req.id,
      req.values,
      {
        headers: { audit: JSON.stringify(auditDetails) },
      }
    );
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_SUCCEEDED,
        AllEditedBeneficiaries: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_FAILED,
        AllEditedBeneficiaries: res.data,
      });
      postAPILogs(api.beneficiaries + "/" + req.id, "put", res, req.values);
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_FAILED,
    });
    postAPILogs(api.beneficiaries + "/" + req.id, "put", res, req.values);
  }
}

export function* getBeneficiaryEditWatcher() {
  yield takeLatest(
    AllBeneficiariesActionTypes.BENEFICIARIES_EDIT,
    handlePendingEdit
  );
}
export function* AllBeneficiaries(req) {
  let res = null;

  try {
    req &&
      (res = yield call(endpoint.post, api.getBeneficiariesMenu, req.user));
    if (res.data.success) {
      yield put({
        type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES_SUCCEEDED,
        AllBeneficiaries: res.data,
      });
    } else {
      yield put({
        type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES_FAILED,
        AllBeneficiaries: res.data,
      });
      postAPILogs(api.getBeneficiariesMenu, "post", res, req.user);
    }
  } catch (err) {
    yield put({
      type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES_FAILED,
    });
    postAPILogs(api.getBeneficiariesMenu, "post", res, req.user);
  }
}

export function* AllBeneficiariesWatcher() {
  yield takeLatest(
    AllBeneficiariesActionTypes.ALL_BENEFICIARIES,
    AllBeneficiaries
  );
}
