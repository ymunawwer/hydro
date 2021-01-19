import { connect } from "react-redux";
import { Dispatch } from "redux";
import AllBeneficiaries from "./SideNav.component";
import {
  get_beneficiaries_data,
  beneficiary_field,
  get_beneficiary_count,
  add_beneficiary,
  get_edit_beneficiary,
  get_changed_beneficiary,
  get_benificiary,
  get_viewMore_items,
  show_disablerecord_flow,
  add_approve_comments,
  add_reject_comments,
  add_submit_popup,
  add_record_popup,
  get_grouplevel_user,
  add_submitFlow_popup,
  add_info_comments,
  add_approve_popup,
  add_benificiary_popup,
  add_reject_popup,
  add_info_popup,
  edit_closed,
  addBeneficaryModalClose,
} from "./Beneficiaries.action";
import { create_beneficiary, get_master_banks } from "./Beneficiaries.action";

import {
  IReduxAllBeneficiariesState,
  IClickContinueDetails,
  IVerifyOtpDetails,
  IRow,
  Iuser,
  approveFlow,
  groupReq,
} from "./SideNav.actionTypes";
import { IBeneficiary } from "./SideNav.actionTypes";
import { ISearchKey } from "../../common/search/search.component";

export const mapStateToProps = (state: IReduxAllBeneficiariesState) => {
  return {
    disabledRecord: state.beneficiaries.GetBeneficiariesData.disableRecord,
    editedRow: state.beneficiaries.AllEditedBeneficiaries.showEditedRecord,
    editbBenificiaryLoading: state.beneficiaries.AllEditedBeneficiaries.loading,
    editedBeneficiaries:
      state.beneficiaries.GetBeneficiariesData.editbenificiary,
    ViewMoreData: state.beneficiaries.ViewComments.data,
    GetBeneficiariesData: state.beneficiaries.GetBeneficiariesData,
    createBeneficiaryData: state.beneficiaries.createBeneficiary,
    addPopup: state.beneficiaries.createBeneficiary.changedValue,
    beneficiaryState: state.beneficiaries.beneficiaries,
    banks: state.beneficiaries.banks,
    groupusers: state.beneficiaries.GetGroupUsers,
    addedBeneficiary: state.beneficiaries.GetCreateBeneficiariesData,
    loggedInUserPhone: state.user.data ? state.user.data.phone : "",
    getBeneficiaryCount: state.beneficiaries.getBeneficiaryCount,
    allBeneficiaries: state.beneficiaries.AllBeneficiaries,
    submitData: state.beneficiaries.AddSubmitComments.AddSubmitComments,
    rejectComments: state.beneficiaries.AddRejectComments.AddRejectComments,
    infoComments: state.beneficiaries.AddInfoComments.AddInfoComments,
    approveComments: state.beneficiaries.AddApproveComments.AddApproveComments,
    beneficiariesLoading:
      state.beneficiaries.AddRejectComments.loading ||
      state.beneficiaries.AddApproveComments.loading ||
      state.beneficiaries.AddInfoComments.loading,
    loggedInUserId: state.user.data ? state.user.data._id : "",
    loggedInCompany: state.user.data ? state.user.data.fk_company_id : "",
    groupAdmin: state.user.data ? state.user.data.isGroupAdmin : false,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getAllBeneficiaries: (
      searchKey?: ISearchKey,
      page?: number,
      pageSize?: number,
      user?: Iuser
    ) => dispatch(get_beneficiaries_data(searchKey, page, pageSize, user)),
    handleApprove: (values: approveFlow) => {
      dispatch(add_approve_comments(values));
    },
    beneficiaryField: (value: boolean) => dispatch(beneficiary_field(value)),
    submitPopup: (values: approveFlow) => {
      dispatch(add_submit_popup(values));
    },
    handleApprovePopup: (approveFlow: boolean) => {
      dispatch(add_approve_popup(approveFlow));
    },
    getAllBeneficiariesData: (user: Iuser) => {
      dispatch(get_benificiary(user));
    },
    handleAddPopup: (changedValue: boolean) => {
      dispatch(add_benificiary_popup(changedValue));
    },
    handleSubmitPopup: (submitFlow: boolean) => {
      dispatch(add_submitFlow_popup(submitFlow));
    },
    handleRejectPopup: (rejectFlow: boolean) => {
      dispatch(add_reject_popup(rejectFlow));
    },
    showEditRecord: (showEditedRecord: boolean) => {
      dispatch(add_record_popup(showEditedRecord));
    },
    showDisableRecord: (disableRecord: boolean) => {
      dispatch(show_disablerecord_flow(disableRecord));
    },
    handlePendingEdit: (values: AllBeneficiaryDetails, id: string) => {
      dispatch(get_edit_beneficiary(values, id));
    },

    handleChangedData: (data: AllBeneficiaryDetails) => {
      dispatch(get_changed_beneficiary(data));
    },
    handleInfoPopup: (infoFlow: boolean) => {
      dispatch(add_info_popup(infoFlow));
    },
    handleReject: (values: approveFlow) => {
      dispatch(add_reject_comments(values));
    },
    handleInfo: (values: approveFlow) => {
      dispatch(add_info_comments(values));
    },
    getBeneficiaryBankCount: (user?: Iuser) =>
      dispatch(get_beneficiary_count(user)),
    getGroupLevelUsers: (user?: groupReq) =>
      dispatch(get_grouplevel_user(user)),
    popupEditClose: () => dispatch(edit_closed()),
    viewMore: (viewInfo: approveFlow) => {
      dispatch(get_viewMore_items(viewInfo));
    },
    addBeneficiaryPopUp: (
      addBeneficiary: boolean,
      beneficiaryState?: IBeneficiary
    ) => {
      dispatch(add_beneficiary(addBeneficiary, beneficiaryState));
    },
    createBeneficiary: (beneficiary: IBeneficiary) =>
      dispatch(create_beneficiary(beneficiary)),
    getMasterBanks: () => dispatch(get_master_banks()),
    addBeneficaryModalClose: () => dispatch(addBeneficaryModalClose()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllBeneficiaries as any);
