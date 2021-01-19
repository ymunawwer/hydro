import { IUserDetails } from "../login/Login.actionTypes";
import { allUserProfileType } from "../user_profiles/all_user_profiles/AllUserProfiles.actionTypes";
import { IBank } from "../user_profiles/createUser/CreateUserProfile.actionTypes";
import { IBankMaster } from "../user_profiles/createUser/CreateUserProfile.actionTypes";
import { boolean } from "yup";

export enum AllBeneficiariesActionTypes {
  GET_INITIAL_STATE = "GET_INITIAL_STATE",
  BENEFICIARIES_DATA = "BENEFICIARIES_DATA",
  // ALL_MASTER_BANKS = "ALL_MASTER_BANKS",
  // ALL_MASTER_BANKS_SUCCEEDED = "ALL_MASTER_BANKS_SUCCEEDED",
  // ALL_MASTER_BANKS_FAILED = "ALL_MASTER_BANKS_FAILED",
  BENEFICIARIES_EDIT = "BENEFICIARIES_EDIT",
  BENEFICIARIES_EDIT_SUCCEEDED = "BENEFICIARIES_EDIT_SUCCEEDED",
  BENEFICIARIES_EDIT_FAILED = "BENEFICIARIES_EDIT_FAILED",
  BENEFICIARIES_EDIT_CHANGED = "BENEFICIARIES_EDIT_CHANGED",

  ALL_BENEFICIARIES = "ALL_BENEFICIARIES",
  ALL_BENEFICIARIES_SUCCEEDED = "ALL_BENEFICIARIES_SUCCEEDED",
  ALL_BENEFICIARIES_FAILED = "ALL_BENEFICIARIES_FAILED",
  ALL_BENEFICIARIES_CHANGED = "ALL_BENEFICIARIES_CHANGED",

  BENEFICIARIES_DATA_SUCCEEDED = "BENEFICIARIES_DATA_SUCCEEDED",
  BENEFICIARIES_DATA_CHANGED = "BENEFICIARIES_DATA_CHANGED",
  BENEFICIARIES_DATA_FAILED = "BENEFICIARIES_DATA_FAILED",
  ADD_BENEFICIARY = "ADD_BENEFICIARY",
  EDIT_CLOSED = "EDIT_CLOSED",
  SAVE_CLOSED = "SAVE_CLOSED",
  CREATE_BENEFICIARY = "CREATE_BENEFICIARY",
  CREATE_BENEFICIARY_SUCCEEDED = "CREATE_BENEFICIARY_SUCCEEDED",
  CREATE_BENEFICIARY_CHANGED = "CREATE_BENEFICIARY_CHANGED",
  CREATE_BENEFICIARY_FAILED = "CREATE_BENEFICIARY_FAILED",
  ADD_BENEFICIARY_CLOSE = "ADD_BENEFICIARY_CLOSE",
  GET_MASTER_BANKS = "GET_MASTER_BANKS",
  GET_MASTER_BANKS_SUCCEEDED = "GET_MASTER_BANKS_SUCCEEDED",
  GET_MASTER_BANKS_FAILED = "GET_MASTER_BANKS_FAILED",

  GROUP_USERS = "GROUP_USERS",
  GROUP_USERS_SUCCEEDED = "GROUP_USERS_SUCCEEDED",
  GROUP_USERS_FAILED = "GROUP_USERS_FAILED",

  ADD_VIEW_DATA = "ADD_VIEW_DATA",

  ADD_VIEW_DATA_SUCCEEDED = "ADD_VIEW_DATA_SUCCEEDED",
  ADD_VIEW_DATA_FAILED = "ADD_VIEW_DATA_FAILED",

  ADD_APPROVE_DATA = "ADD_APPROVE_DATA",
  ADD_APPROVE_DATA_SUCCEEDED = "ADD_APPROVE_DATA_SUCCEEDED",
  ADD_APPROVE_DATA_FAILED = "ADD_APPROVE_DATA_FAILED",
  ADD_APPROVE_DATA_CHANGED = "ADD_APPROVE_DATA_CHANGED",

  ADD_SEND_OTP = "ADD_SEND_OTP",
  ADD_SEND_OTP_SUCCEEDED = "ADD_SEND_OTP_SUCCEEDED",
  ADD_SEND_OTP_FAILED = "ADD_SEND_OTP_FAILED",

  ADD_VERIFIED_OTP = "ADD_VERIFIED_OTP",
  ADD_VERIFIED_OTP_SUCCEEDED = "ADD_VERIFIED_OTP_SUCCEEDED",
  ADD_VERIFIED_OTP_FAILED = "ADD_VERIFIED_OTP_FAILED",
  ADD_REJECT_DATA = "ADD_REJECT_DATA",
  ADD_REJECT_DATA_SUCCEEDED = "ADD_REJECT_DATA_SUCCEEDED",
  ADD_REJECT_DATA_FAILED = "ADD_REJECT_DATA_FAILED",
  ADD_REJECT_DATA_CHANGED = "ADD_REJECT_DATA_CHANGED",
  ADD_INFO_DATA = "ADD_INFO_DATA",
  ADD_INFO_DATA_SUCCEEDED = "ADD_INFO_DATA_SUCCEEDED",
  ADD_INFO_DATA_FAILED = "ADD_INFO_DATA_FAILED",
  ADD_INFO_DATA_CHANGED = "ADD_INFO_DATA_CHANGED",

  SUBMIT_INFO_DATA = "SUBMIT_INFO_DATA",
  SUBMIT_INFO_DATA_SUCCEEDED = "SUBMIT_INFO_DATA_SUCCEEDED",
  SUBMIT_INFO_DATA_FAILED = "SUBMIT_INFO_DATA_FAILED",
  SUBMIT_INFO_DATA_CHANGED = "SUBMIT_INFO_DATA_CHANGED",

  BENEFICIARY_COUNT = "BENEFICIARY_COUNT",
  BENEFICIARY_COUNT_SUCCEEDED = "BENEFICIARY_COUNT_SUCCEEDED",
  BENEFICIARY_COUNT_FAILED = "BENEFICIARY_COUNT_FAILED",
}
export interface ApproveReq {}

export interface AllBeneficiariesData {
  AddSubmitComments: {
    success: boolean;
    data: {
      userId: string;
      beneficiaryId: string[];
      status: string;
      comments: string;
    };
    beneficiary: [];
    message?: string;
  };
  AddRejectComments: {
    success: boolean;
    data: {
      userId: string;
      beneficiaryId: string[];
      status: string;
      comments: string;
    };
    beneficiary: [];
    message?: string;
  };
  AddInfoComments: {
    success: boolean;
    data: {
      userId: string;
      beneficiaryId: string[];
      status: string;
      comments: string;
    };
    beneficiary: [];
    message?: string;
  };
  AddApproveComments: {
    success: boolean;
    data: {
      userId: string;
      beneficiaryId: string[];
      status: string;
      comments: string;
    };
    beneficiary: [];
    message?: string;
  };
  loading?: boolean;
  value: boolean;
  headerIcon: boolean;
  success: boolean;
  changedValue: false;
  showEditedRecord: false;
  disableRecord: true;
  totalRecords?: number;
  message?: string;
  BeneficiariesList?: FilteredBeneficiary;
  data: AllBeneficiaryDetails | AllBeneficiaryDetails[];
  operation?: string;
  createdDate: string;
  editbenificiary: {
    success: true;
    data: {
      _id: "";
      beneficiary_name: "";
      bankName: "";
      nick_name: "";
      account_number: "";
      ifscCode: "";
      description: "";
      fk_userId: "";
      fk_companyId: "";
      approval_status: "";
      isActive: false;
      isDeleted: false;
      createdBy: "";
      createdDate: "";
      modifiedBy: "";
      modifiedDate: "";
    };
  };
  // showAddBeneficiaryPopUp: boolean;
}
export interface EditedDetails {
  success?: boolean;
  loading?: boolean;
  data?: AllBeneficiaryDetails;
  message?: string;
  isActive?: boolean;
  createBeneficiaryData: {
    success?: boolean;
    data?: AllBeneficiaryDetails;
    message?: string;
    isActive?: boolean;
  };
}

export interface banksOption {
  label?: string;
  value?: string;
  bankName: string;
  count?: number;
}
export interface editedUser {
  data: AllBeneficiaryDetails | AllBeneficiaryDetails[];
  success: boolean;
}
export interface groupUser {
  success: true;
  data: GroupDetails[];
  label: string;
  value: string;
  groupUsersFilter: rectDroplist[];
}
export interface GroupDetails {
  _id: string;
  name: string;
}
export interface rectDroplist {
  label: string;
  value: string;
}

export interface FilteredBeneficiary {
  success: boolean;
  totalRecords?: number;
  data: AllBeneficiaryDetails | AllBeneficiaryDetails[] | undefined;
}
export interface Loginuser {
  userId: string;
  myApproval: boolean;
}
export interface BeneficiariesCount {
  success: boolean;
  data: {
    totalRecords: Number;
    banks: [{ bankName: string; count: number }];
    userRole: null | string | undefined;
    approvalLevels: any;
  };
  loading: boolean;
}
export interface banksType {
  bankName: string;
  count: number;
}

export interface IverifyOtpStateDetails {
  status?: string;
  message?: String;
}
export interface ApproveComments {
  comment: string;
}
export const allBeneficiariesDataType = {
  _id: "",
  beneficiary_name: "",
  nick_name: "",
  bankName: "",
  account_number: "",
  ifscCode: "",
  description: "",
  fk_userId: "",
  fk_companyId: "",
  approval_status: "",
  isActive: false,
  isDeleted: false,
  createdBy: "",
  createdDate: "",
  modifiedBy: "",
  modifiedDate: "",
};
export interface allFilers {
  success: false;
  totalRecords?: 1;
  data: {
    _id: "";
    beneficiary_name: "";
    nick_name: "";
    account_number: "";
    ifscCode: "";
    description: "";
    fk_userId: "";
    fk_companyId: "";
    approval_status: "";
    isActive: false;
    isDeleted: false;
    createdBy: "";
    createdDate: "";
    modifiedBy: "";
    modifiedDate: "";
  };
}
export interface approveFlow {
  userId: string;
  beneficiaryId: string[];
  status: string;
  comments: string;
}
export interface Iuser {
  userId: string;
}
export interface userData {
  success: boolean;
  data: {
    fundTransferLimit?: { amount: string };
    isEmailVerified: boolean;
    isGroupAdmin: boolean;
    fk_company_id: string[];
    _id: string;
    email: string;
    isCorporateAdmin: boolean;
    isSuperAdmin: boolean;
    name: string;
    password: string;
    phone: string;
    roleId: string;
    twoStepVerification: boolean;
    userName: string;
    modules: string[];
    accessToken: string;
  };
}
export const initialState: AllBeneficiariesData = {
  loading: false,
  success: false,
  createdDate: "",
  data: {
    _id: "",
    beneficiary_name: "",
    bankName: "",
    nick_name: "",
    account_number: "",
    ifscCode: "",
    description: "",
    fk_userId: "",
    fk_companyId: "",
    approval_status: "",
    isActive: false,
    isDeleted: false,
    createdBy: "",
    createdDate: "",
    modifiedBy: "",
    modifiedDate: "",
  },
  message: "",
  headerIcon: true,
  changedValue: false,
  showEditedRecord: false,
  disableRecord: true,
  BeneficiariesList: {
    success: false,
    totalRecords: 1,
    data: {
      _id: "",
      beneficiary_name: "",
      bankName: "",
      nick_name: "",
      account_number: "",
      ifscCode: "",
      description: "",
      fk_userId: "",
      fk_companyId: "",
      approval_status: "",
      isActive: false,
      isDeleted: false,
      createdBy: "",
      createdDate: "",
      modifiedBy: "",
      modifiedDate: "",
    },
  },
  operation: "",
  //addBeneficiary: false,
};
export interface IRow {
  original: AllBeneficiaryDetails;
}
export const getAllBeneficiariesInitialState: any = {
  loading: false,
  AddSubmitComments: {
    success: false,
    data: {
      userId: "",
      beneficiaryId: [""],
      status: "",
      comments: "",
    },
    beneficiary: [],
    message: "",
  },
  AddInfoComments: {
    success: false,
    data: {
      userId: "",
      beneficiaryId: [""],
      status: "",
      comments: "",
    },
    beneficiary: [],
    message: "",
  },
  AddRejectComments: {
    success: false,
    data: {
      userId: "",
      beneficiaryId: [""],
      status: "",
      comments: "",
    },
    beneficiary: [],
    message: "",
  },
  AddApproveComments: {
    success: false,
    data: {
      userId: "",
      beneficiaryId: [""],
      status: "",
      comments: "",
    },
    beneficiary: [],
    message: "",
  },
  createBeneficiaryData: {
    success: true,
    data: {
      _id: "",
      beneficiary_name: "",
      bankName: "",
      nick_name: "",
      account_number: "",
      ifscCode: "",
      description: "",
      fk_userId: "",
      fk_companyId: "",
      approval_status: "",
      isActive: false,
      isDeleted: false,
      createdBy: "",
      createdDate: "",
      modifiedBy: "",
      modifiedDate: "",
    },
  },
};

export interface columns {
  Header: any;
  filterable?: boolean;
  accessor?: string;
  Cell?: any;
  width?: any;
  id?: string;
  Filter?: (data: any) => void;
}
export interface bankDetails {
  bankName: "Samba Financial Group";
  count: 5;
}
export interface topMenu {
  success: boolean;
  data: topMenuData;
}
export interface topMenuData {
  totalRecords: number;
  banks: bankDetails[];
  userRole: null | string;
  approvalLevels: number;
  currentPosition: number;
}
export interface IState {
  IsApproveOpen: boolean;
  valueToBeSearched: string;
  filteredData: IFilterDetails | IFilterDetails[];
  groupName: string;
  beneficiary_name: boolean;
  key?: string;
  actionToolTip: any;
  auditInfo: any;
  // selectedRow: IEditRow;
  selectedColumn: string;
  selectedUser: string;
  userId: string;
  showAddPopup: boolean;
  IsubmitInfoOpen: boolean;
  selectedRow: any;
  transactionDetails: boolean;
  pageSize: number;
  page: number;
  IsEditOpen: boolean;
  IsViewOpen: boolean;
  IsRejectOpen: boolean;
  IsInfoOpen: boolean;
  initialPageSize: number;
  searchResults?: string | undefined;
  selectedRowArray: string[] | [];
  viewMore: number;
}
export interface IFilterDetails {
  _id: string | undefined;
  name: string;
}
export interface approveFlow {
  userId: string;
  beneficiaryId: string[];
  status: string;
  comments: string;
  lang: string;
}

export const IEditVal = {
  account_number: "",
  approval_status: "",
  bankName: "",
  beneficiary_name: "",
  commentedBy: "",
  comments: "",
  createdDate: "",
  ifscCode: "",
  isActive: "",
  _id: "",
};

export interface IEdit {
  account_number: string;
  approval_status: string;
  bankName: string;
  beneficiary_name: string;
  commentedBy: string;
  comments: string;

  createdDate: string;
  ifscCode: string;
  isActive: string;
  _id: string;
}

export interface ICompanyValue {
  english: string;
  arabic: string;
}
export interface editDetail {
  isActive: boolean;
}
export interface createBeneficiary {
  beneficiary_name: string | undefined;
  nick_name: string;
  account_number: string;
  ifscCode: string;
  description: string;
  address: string;
  country: string;
  bankName?: string | undefined;
  comments: string;
  fk_bankId: any;
  fk_approver_Id?: rectDroplist;
  fk_userId: string;
  fk_company_id: string[];
}
export interface IProps {
  approvalRequest: IRow;
  editbBenificiaryLoading: boolean;
  beneficiariesLoading: boolean;
  hideNeedInfo: () => void;
  hideApprove: () => void;
  hideSubmitInfo: () => void;
  hideRejectInfo: () => void;
  hideViewInfo: () => void;
  handlePendingEdit: (
    values: EditedDetails,
    id: string | undefined,
    user?: Loginuser
  ) => void;
  beneficiaryState: AllBeneficiaryDetails;
  editedBeneficiaries: EditedDetails;
  editedRow: AllBeneficiariesData;
  addedBeneficiary: AllBeneficiariesData;
  toastr: (message: string) => void;
  handleAddPopup: (changedValue: boolean) => void;
  beneficiaryField: (value: boolean) => void;
  getAllBeneficiaries: (
    searchKey?: ISearchKey,
    page?: number,
    pageSize?: number,
    user?: Loginuser
  ) => void;
  getAllBeneficiariesData: (user?: Loginuser) => void;
  groupusers: groupUser;
  addPopup: boolean;
  disabledRecord: boolean;
  showEditRecord: (showEditedRecord: boolean) => void;
  showDisableRecord: (disabledRecord: boolean) => void;
  handleChangedData: (data: AllBeneficiaryDetails | undefined) => void;
  getGroupLevelUsers: (user: groupReq) => void;
  approveComments: approveResponse;
  submitDatares: boolean;
  loggedInCompany: string[];
  loggedInUserId: string;
  groupAdmin: boolean;
  infoComments: approveResponse;
  rejectComments: approveResponse;
  submitData: approveResponse;
  GetBeneficiariesData: AllBeneficiariesData;
  allBeneficiaries: AllBeneficiariesData;
  ViewMoreData: viewResponse;
  approveData: boolean;
  rejectData: boolean;
  infoData: boolean;
  popupEditClose: () => void;
  handleApprove: (values: approveFlow) => void;
  handleReject: (values: approveFlow) => void;
  handleInfo: (values: approveFlow) => void;
  submitPopup: (values: approveFlow) => void;
  handleApprovePopup: (approveFlow: boolean) => void;
  handleSubmitPopup: (submitFlow: boolean) => void;
  handleRejectPopup: (rejectFlow: boolean) => void;
  handleInfoPopup: (infoFlow: boolean) => void;
  BeneficiariesList: AllBeneficiariesData;
  role: string;
  updateBeneficiariesData: (data: AllBeneficiaryDetails) => void;
  createBeneficiaryData: EditedDetails;
  userId: string;
  createBeneficiary: (beneficiary: any) => void;
  banks: IBankMaster;
  getMasterBanks: () => void;
  getBeneficiaryBankCount: (user: approvalUser) => void;
  getBeneficiaryCount: BeneficiariesCount;
  viewMore: (viewInfo: viewmoreReq) => void;
  addBeneficiaryPopUp: (
    addBeneficiary: boolean,
    beneficiaryState?: AllBeneficiaryDetails
  ) => void;
  addBeneficaryModalClose: () => void;
}
export interface benState {
  beneficiaryType: 1;
}
export interface AllBeneficiaryDetails {
  _id?: string;
  beneficiaryType?: number | string;
  country?: rectDroplist | string;
  address: string;
  comments: string;
  bankId?: string;
  commentDate?: string;
  fk_approver_Id?: any;
  commentedBy?: string;
  currentPosition?: number;
  approvalLevels?: number;
  role?: string;
  beneficiary_name?: string;
  nick_name?: string;
  account_number?: string;
  ifscCode?: string;
  description?: string;
  fk_userId?: string;
  fk_companyId?: string;
  approval_status?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: string;
  createdDate?: string;
  fk_bankId: any;
  modifiedBy?: string;
  modifiedDate?: string;
  bankName?: string;
  userApproved?: boolean;
  showMoreInfo?: boolean;
}

export interface AllStates {
  GetBeneficiariesData: AllBeneficiariesData;
  banks: banksType;
  GetCreateBeneficiariesData: AllBeneficiariesData;
  AllBeneficiaries: AllBeneficiariesData;
  addBeneficiary: AllBeneficiariesData;
  user: userData;
  getBeneficiaryCount: BeneficiariesCount;
  AddRejectComments: rejectState;
  AddInfoComments: infoState;
  AddApproveComments: approveState;
  ViewComments: viewrqs;
  AddSubmitComments: approveState;
  submitFlow: boolean;
}
export interface approveState {
  AddApproveComments?: {
    approveFlow: approveResponse;
  };
  AddSubmitComments?: {
    approveFlow: approveResponse;
  };
}
export interface approvalUser {
  userId: string;
  myApproval?: boolean;
}
export interface rejectState {
  AddRejectComments: {
    rejectFlow: approveResponse;
  };
}
export interface infoState {
  AddInfoComments: {
    infoFlow: approveResponse;
  };
}
export interface viewrqs {
  success: boolean;
  data: viewResponse;
}
export interface IReduxAllBeneficiariesState {
  beneficiaries: AllStates;
  user: userData;
}
export interface viewState {
  role: string;
  status: boolean;
  users: string[];
  approverComments: commentsData[];
}
export interface viewResponse {
  beneficiary_name: string;
  showApprover: boolean;
  bankName: string;
  address: string;
  nick_name: string;
  account_number: string;
  ifscCode: string;
  description: string;
  fk_userId: string;
  approval_status: string;
  isActive: boolean;
  createdDate: string;
  createdBy: string;
  showMoreInfo: boolean;
  timeLine: {
    approvalLevels: number;
    isApprovalAvailable: boolean;
    approval: ViewApproval[];
  };
}
export interface ViewApproval {
  role: string;
  status: boolean;
  users: string[];
  approverComments: commentsReq[];
}
export interface commentsReq {
  comment: "reviewed";
  commentDate: "2020-07-13T06:23:59.820Z";
}
export interface viewmoreReq {
  beneficiaryId: string | undefined;
  userId: string;
}

export interface approveResponse {
  success: boolean;
  data: {
    userId: string;
    beneficiaryId: string[];
    status: string;
    comments: string;
  };
  beneficiary: [];
  message?: string;
}
export const getViewDataInitialState: any = {
  success: true,
  data: {
    userId: "",
    beneficiaryId: [""],
    status: "",
    comments: "",
  },
  beneficiary: [],
  message: "",
};

export interface commentsData {
  comment: string;
  commentDate: string;
}
export interface IReduxBaseAction {
  type: AllBeneficiariesActionTypes;
}

export type AllBeneficiaryReducerActions =
  | IRedux_GetInitialState_Action
  | IRedux_BeneficiariesData_Action
  | IRedux_BeneficiariesData_Succeeded_Action
  | IRedux_BeneficiariesData_Changed_Action
  | IRedux_BeneficiariesData_Failed_Action
  | IRedux_addBeneficiary_Action
  | IRedux_BeneficiaryCount_Action
  | IRedux_BeneficiaryCount_Succeeded_Action
  | IRedux_BeneficiaryCount_Failed_Action
  | IRedux_EditClosed_Action
  | IRedux_addApproveData_Failed_Action
  | IRedux_addApproveData_Succeeded_Action
  | IRedux_addApproveData_Action
  | IRedux_AddRejectData_Action
  | IRedux_AddRejectData_Succeeded_Action
  | IRedux_AddRejectData_Failed_Action
  | IRedux_AddInfoData_Action
  | IRedux_addViewData_Action
  | IRedux_addApproveDataChanged_Action
  | IRedux_addViewData_Succeeded_Action
  | IRedux_addViewData_Failed_Action
  | IRedux_AddInfoData_Succeeded_Action
  | IRedux_AddInfoData_Failed_Action
  | IRedux_AddRejectDataChanged_Action
  | IRedux_AddInfoDataChanged_Action
  | IRedux_SubmitData_Failed_Action
  | IRedux_SubmitData_Succeeded_Action
  | IRedux_SubmitData_Action
  | IRedux_submitDataChanged_Action
  | IRedux_grouplevelData_Failed_Action
  | IRedux_grouplevelData_Action
  | IRedux_grouplevelData_Succeeded_Action
  | IRedux_CreateData_Action
  | IRedux_createData_Succeeded_Action
  | IRedux_createData_Failed_Action
  | IRedux_SaveClosed_Action
  | IRedux_EditBeneficiaryData_Failed_Action
  | IRedux_EditBeneficiaryData_Action
  | IRedux_EditBeneficiaryData_Succeeded_Action
  | IRedux_ChangebeneficiaryData_Failed_Action
  | IRedux_createData_Changed_Action
  | IRedux_ChangeAllbeneficiaryData_Failed_Action
  | IRedux_AllBeneficiaryData_Action
  | IRedux_AllBeneficiaryData_Succeeded_Action
  | IRedux_AllBeneficiaryData_Failed_Action
  | IRedux_addBeneficaryClose_Action;

export interface IRedux_AllBeneficiaryData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES;
}
export interface IRedux_AllBeneficiaryData_Succeeded_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES_SUCCEEDED;
  AllBeneficiaries: AllBeneficiariesData;
}
export interface IRedux_AllBeneficiaryData_Failed_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES_FAILED;
  AllBeneficiaries: AllBeneficiariesData;
}

export interface IRedux_ChangeAllbeneficiaryData_Failed_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ALL_BENEFICIARIES_CHANGED;
  AllBeneficiaries: AllBeneficiariesData;
  value: boolean;
}

export interface IRedux_EditBeneficiaryData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT;
}
export interface IRedux_EditBeneficiaryData_Succeeded_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_SUCCEEDED;
  AllEditedBeneficiaries: AllBeneficiariesData;
  BeneficiariesList: AllBeneficiariesData;
  editbenificiary: EditedDetails;
}
export interface IRedux_EditBeneficiaryData_Failed_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_FAILED;
  AllEditedBeneficiaries: AllBeneficiariesData;
}

export interface IRedux_ChangebeneficiaryData_Failed_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_CHANGED;
  AllEditedBeneficiaries: AllBeneficiariesData;
  showEditedRecord: boolean;
  disableRecord: boolean;
}

export interface IRedux_CreateData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY;
}
export interface IRedux_createData_Succeeded_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY_SUCCEEDED;
  GetCreateBeneficiariesData: AllBeneficiariesData;
}
export interface IRedux_createData_Changed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY_CHANGED;
  changedValue: boolean;
  values: AllBeneficiaryDetails;
  GetCreateBeneficiariesData: AllBeneficiariesData;
}
export interface IRedux_createData_Failed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.CREATE_BENEFICIARY_FAILED;
  GetCreateBeneficiariesData: AllBeneficiariesData;
}
export interface IRedux_addBeneficaryClose_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_BENEFICIARY_CLOSE;
}

export interface IRedux_grouplevelData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.GROUP_USERS;
}
export interface IRedux_grouplevelData_Succeeded_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.GROUP_USERS_SUCCEEDED;
  GetGroupUsers: groupUser;
  groupUsersFilter: rectDroplist;
}
export interface IRedux_grouplevelData_Failed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.GROUP_USERS_FAILED;
  GetGroupUsers: approveResponse;
}
export interface IRedux_SubmitData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA;
}
export interface IRedux_SubmitData_Succeeded_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_SUCCEEDED;
  AddSubmitComments: approveResponse;
}

export interface IRedux_SubmitData_Failed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_FAILED;
  AddSubmitComments: approveResponse;
}
export interface IRedux_submitDataChanged_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_CHANGED;
  AddSubmitComments: approveResponse;
  submitFlow: boolean;
}

export interface IRedux_AddRejectData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_REJECT_DATA;
}
export interface IRedux_AddRejectData_Succeeded_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_REJECT_DATA_SUCCEEDED;
  AddRejectComments: approveResponse;
}

export interface IRedux_AddRejectDataChanged_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_REJECT_DATA_CHANGED;
  AddRejectComments: approveResponse;
  rejectFlow: boolean;
}
export interface IRedux_AddRejectData_Failed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_REJECT_DATA_FAILED;
  AddRejectComments: approveResponse;
}

export interface IRedux_AddInfoData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_INFO_DATA;
}
export interface IRedux_AddInfoData_Succeeded_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_INFO_DATA_SUCCEEDED;
  AddInfoComments: approveResponse;
}

export interface IRedux_AddInfoDataChanged_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_INFO_DATA_CHANGED;
  AddInfoComments: approveResponse;
  infoFlow: boolean;
}
export interface IRedux_AddInfoData_Failed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_INFO_DATA_FAILED;
  AddInfoComments: approveResponse;
}

export interface IRedux_addViewData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_VIEW_DATA;
}
export interface IRedux_addViewData_Succeeded_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_VIEW_DATA_SUCCEEDED;
  ViewComments: approveResponse;
}
export interface IRedux_addViewData_Failed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_VIEW_DATA_FAILED;
  ViewComments: approveResponse;
}

export interface IRedux_addApproveData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA;
}
export interface IRedux_addApproveData_Succeeded_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA_SUCCEEDED;
  AddApproveComments: approveResponse;
}
export interface IRedux_addApproveData_Failed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA_FAILED;
  AddApproveComments: approveResponse;
}

export interface IRedux_addApproveDataChanged_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_APPROVE_DATA_CHANGED;
  AddApproveComments: approveResponse;
  approveFlow: boolean;
}

export interface IRedux_EditClosed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.EDIT_CLOSED;
}

export interface IRedux_SaveClosed_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.SAVE_CLOSED;
}

export interface IRedux_BeneficiaryCount_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARY_COUNT;
}
export interface IRedux_BeneficiaryCount_Succeeded_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARY_COUNT_SUCCEEDED;
  getBeneficiaryCount: BeneficiariesCount;
}
export interface IRedux_BeneficiaryCount_Failed_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARY_COUNT_FAILED;
  getBeneficiaryCount: BeneficiariesCount;
}

export interface IverifyOtpStateDetails {
  status?: string;
  message?: String;
}
export interface IVerifyOtpDetails {
  otp?: string;
  email?: String;
  phone?: string;
  data?: string;
}

export interface IRedux_GetInitialState_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.GET_INITIAL_STATE;
}
export interface IRedux_BeneficiariesData_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA;
}
export interface IRedux_BeneficiariesData_Succeeded_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA_SUCCEEDED;
  GetBeneficiariesData: AllBeneficiariesData;
  ShowAllCheckBoxes: [boolean, boolean, boolean];
  previous: boolean;
  headerIcon: boolean;
  accept: boolean;
}
export interface IRedux_BeneficiariesData_Changed_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA_CHANGED;
  data: AllBeneficiaryDetails;
  BeneficiariesList: AllBeneficiariesData;
}
export interface IRow {
  original: AllBeneficiaryDetails;
}

export interface IEditRow {
  original: IEdit;
}
export interface IClickContinueDetails {
  selectedOption?: string;
  phone?: String;
  otpStatus?: string;
  message?: string;
  email?: string;
}

export interface IRedux_BeneficiariesData_Failed_Action
  extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.BENEFICIARIES_DATA_FAILED;
  GetBeneficiariesData: AllBeneficiariesData;
}
export interface IRedux_addBeneficiary_Action extends IReduxBaseAction {
  type: AllBeneficiariesActionTypes.ADD_BENEFICIARY;
  addBeneficiary: boolean;
  beneficiaryState: boolean;
  GetCreateBeneficiariesData: AllBeneficiariesData;
  createBeneficiaryData: AllBeneficiariesData;
}

export type CreateBeneficiaryReducerActions = IRedux_createBeneficiaryAction;

export interface IRedux_createBeneficiaryAction extends IReduxBaseAction {
  beneficiary: IBeneficiary;
}

export interface CreateBeneficiaryState {
  beneficiary: IBeneficiary;
  banks: IBankMaster | [];
}
export interface groupReq {
  groupId: string;
}
export const defaultBeneficiaryState: CreateBeneficiaryState = {
  beneficiary: {
    beneficiary_name: "",
    nick_name: "",
    fk_bankId: { value: "" },
    account_number: "",
    ifscCode: "",
    description: "",
  },
  banks: [],
};

export interface IBeneficiary {
  beneficiary_name: string;
  nick_name: string;
  fk_bankId: { value: string };
  account_number: string;
  ifscCode: string;
  description: string;
}

export type GetMasterBanksReducerActions = IGetMasterBanks_action;

export interface IGetMasterBanks_action extends IReduxBaseAction {
  banks: IBankMaster;
}
