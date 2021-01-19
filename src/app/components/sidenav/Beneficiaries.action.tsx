import {
  AllBeneficiariesActionTypes,
  Loginuser,
  approveFlow,
  IClickContinueDetails,
  IVerifyOtpDetails,
  IRow,
  IBeneficiary,
  Iuser,
  groupReq,
  AllBeneficiaryDetails,
} from "./SideNav.actionTypes";
import { ISearchKey } from "../../common/search/search.component";

export function get_beneficiary_count(user?: Iuser) {
  return {
    type: AllBeneficiariesActionTypes.BENEFICIARY_COUNT,
    user,
  };
}

export function get_grouplevel_user(user?: groupReq) {
  return {
    type: AllBeneficiariesActionTypes.GROUP_USERS,
    user,
  };
}
export function get_viewMore_items(viewInfo?: approveFlow) {
  return {
    type: AllBeneficiariesActionTypes.ADD_VIEW_DATA,
    viewInfo,
  };
}

export function add_approve_comments(values: approveFlow) {
  return {
    type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA,
    payload: { values },
  };
}

export function add_approve_popup(approveFlow: boolean) {
  return {
    type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA_CHANGED,
    approveFlow,
  };
}

export function add_submitFlow_popup(submitFlow: boolean) {
  return {
    type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_CHANGED,
    submitFlow,
  };
}

export function add_benificiary_popup(changedValue: boolean) {
  return {
    type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY_CHANGED,
    changedValue,
  };
}
export function add_reject_popup(rejectFlow: boolean) {
  return {
    type: AllBeneficiariesActionTypes.ADD_REJECT_DATA_CHANGED,
    rejectFlow,
  };
}

export function add_record_popup(showEditedRecord: boolean) {
  return {
    type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_CHANGED,
    showEditedRecord,
  };
}
export function show_disablerecord_flow(disableRecord?: boolean) {
  return {
    type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_CHANGED,
    disableRecord,
  };
}

export function get_edit_beneficiary(
  values: AllBeneficiaryDetails,
  id: string
) {
  return {
    type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT,
    values,
    id,
  };
}

export function get_changed_beneficiary(data: AllBeneficiaryDetails) {
  return {
    type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA_CHANGED,
    data,
  };
}
export function add_info_popup(infoFlow: boolean) {
  return {
    type: AllBeneficiariesActionTypes.ADD_INFO_DATA_CHANGED,
    infoFlow,
  };
}

export function add_reject_comments(values: approveFlow) {
  return {
    type: AllBeneficiariesActionTypes.ADD_REJECT_DATA,
    payload: { values },
  };
}
export function add_info_comments(values: approveFlow) {
  return {
    type: AllBeneficiariesActionTypes.ADD_INFO_DATA,
    payload: { values },
  };
}

export function add_submit_popup(values: approveFlow) {
  return {
    type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA,
    payload: { values },
  };
}

export function beneficiary_field(value: boolean) {
  return {
    type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES_CHANGED,
    value,
  };
}
export function edit_closed() {
  return {
    type: AllBeneficiariesActionTypes.EDIT_CLOSED,
  };
}

export function get_beneficiaries_data(
  searchKey?: ISearchKey,
  page?: number,
  pageSize?: number,
  user?: Loginuser
) {
  return {
    type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA,
    payload: { ...searchKey, page, pageSize, user },
  };
}

export function get_benificiary(user?: Loginuser) {
  return {
    type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES,
    user,
  };
}

export function add_beneficiary(
  addBeneficiary: boolean,
  beneficiaryState?: IBeneficiary
) {
  return {
    type: AllBeneficiariesActionTypes.ADD_BENEFICIARY,
    addBeneficiary,
    beneficiaryState,
  };
}

export function create_beneficiary(beneficiary: IBeneficiary) {
  return {
    type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY,
    beneficiary,
  };
}
export function get_master_banks() {
  return {
    type: AllBeneficiariesActionTypes.GET_MASTER_BANKS,
  };
}

export function addBeneficaryModalClose() {
  return {
    type: AllBeneficiariesActionTypes.ADD_BENEFICIARY_CLOSE,
  };
}
