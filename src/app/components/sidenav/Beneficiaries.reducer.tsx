import {
  AllBeneficiariesActionTypes,
  AllBeneficiaryReducerActions,
  AllBeneficiariesData,
  getAllBeneficiariesInitialState,
  AllBeneficiaryDetails,
  allBeneficiariesDataType,
  FilteredBeneficiary,
  IBeneficiary,
  defaultBeneficiaryState,
  IRedux_createBeneficiaryAction,
  GetMasterBanksReducerActions,
} from "./SideNav.actionTypes";
import { IBankMaster } from "../user_profiles/createUser/CreateUserProfile.actionTypes";

import StateManager from "react-select";
import { State } from "react-select/src/Select";

export const ViewMore_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.ADD_VIEW_DATA:
      return {
        ...state,
        loading: true,
      };

    case AllBeneficiariesActionTypes.ADD_VIEW_DATA_SUCCEEDED:
      return {
        ...state,
        loading: false,
        ...action.ViewComments,
      };

    case AllBeneficiariesActionTypes.ADD_VIEW_DATA_FAILED:
      return {
        ...state,
        loading: false,
        ...action.ViewComments,
      };

    default:
      return state;
  }
};

export const Submitmore_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.SUBMIT_INFO_DATA:
      return {
        ...state,
        loading: true,
      };

    case AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_SUCCEEDED:
      return {
        ...state,
        loading: false,
        AddSubmitComments: action.AddSubmitComments,
      };
    case AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_CHANGED: {
      return {
        ...state,
        loading: false,
        AddSubmitComments: {
          ...state.AddSubmitComments,
          success: false,
          message: "",
        },
        submitFlow: action.submitFlow,
      };
    }

    case AllBeneficiariesActionTypes.SUBMIT_INFO_DATA_FAILED:
      return {
        ...state,
        loading: false,
        AddSubmitComments: action.AddSubmitComments,
      };

    default:
      return state;
  }
};
export const getBeneficiariesData_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.BENEFICIARIES_DATA:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.BENEFICIARIES_DATA_SUCCEEDED: {
      let data = action.GetBeneficiariesData.data;

      return {
        loading: false,
        ...action.GetBeneficiariesData,
        BeneficiariesList: action.GetBeneficiariesData,
      };
    }
    case AllBeneficiariesActionTypes.BENEFICIARIES_DATA_CHANGED: {
      //const newState = { ...state, ...action.data };
      //let id = "5f159874b7007510985741ad";
      // let newData = state.BeneficiariesList && state.BeneficiariesList.data;
      // let beneficiary =
      //   Array.isArray(newData) &&

      //   newData.find((item) => item._id === action.data._id);
      // beneficiary = {
      //   ...beneficiary,
      //   ...action.data,
      // };
      // let newList = newData.filter((value) => value._id !== action.data._id);
      // let beneficiaryList = state.BeneficiariesList;
      // // beneficiaryList.data = newList;

      // // let newArray = newList.push(beneficiary);
      // if (
      //   state.BeneficiariesList &&
      //   Array.isArray(state.BeneficiariesList.data) &&
      //   state.BeneficiariesList.data.length === 1
      // ) {
      //   let newList = [];
      //   beneficiaryList = state.BeneficiariesList;
      //   beneficiaryList.data = newList;
      //   newList.push(beneficiary);
      // } else {
      //   beneficiaryList = state.BeneficiariesList;
      //   beneficiaryList.data = newList;

      //   let newArray = newList.push(beneficiary);
      // }
      return {
        ...state,
        //BeneficiariesList: beneficiaryList,
      };

      // return {
      //   loading: false,
      //   BeneficiariesList: action.GetBeneficiariesData,
      // };
    }

    case AllBeneficiariesActionTypes.BENEFICIARIES_DATA_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case AllBeneficiariesActionTypes.BENEFICIARIES_EDIT:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        ...action.AllEditedBeneficiaries,
        editbenificiary: action.AllEditedBeneficiaries,
        showEditedRecord: true,
      };
    }
    case AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_CHANGED: {
      let editedvalues;
      if (
        state.editbenificiary &&
        state.editbenificiary.success &&
        action.showEditedRecord === false
      ) {
        editedvalues = state.editbenificiary.data;
        editedvalues.success = false;
      }
      if (
        state.editbenificiary &&
        state.editbenificiary.success &&
        action.disableRecord === true
      ) {
        editedvalues = state.editbenificiary.data;
        editedvalues.success = false;
      }
      return {
        ...state,
        loading: false,
        ...action.AllEditedBeneficiaries,
        showEditedRecord:
          action.showEditedRecord! == undefined
            ? action.showEditedRecord
            : false,
        disableRecord:
          action.disableRecord !== undefined ? action.disableRecord : true,
        editbenificiary: editedvalues ? editedvalues : state.editbenificiary,
      };
    }

    case AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_FAILED: {
      return {
        ...state,
        loading: false,
        ...action.AllEditedBeneficiaries,
      };
    }
    case AllBeneficiariesActionTypes.EDIT_CLOSED: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
export const AllBeneficiaries_reducer = (
  state: any = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.ALL_BENEFICIARIES:
      return {
        loading: true,
      };
    case AllBeneficiariesActionTypes.ALL_BENEFICIARIES_SUCCEEDED: {
      return {
        loading: false,
        ...action.AllBeneficiaries,
      };
    }

    case AllBeneficiariesActionTypes.ALL_BENEFICIARIES_FAILED: {
      return {
        loading: false,
        ...action.AllBeneficiaries,
      };
    }
    case AllBeneficiariesActionTypes.ALL_BENEFICIARIES_CHANGED: {
      const newState = { ...state };
      let newVal: boolean = state.value;
      let arabicVal: boolean = state.arabicvalue;
      if (action.value !== undefined) {
        newVal = action.value;
      }

      return {
        ...state,
        loading: false,
        value: newVal,
      };
    }

    default:
      return state;
  }
};
export const getBeneficiaryCount_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.BENEFICIARY_COUNT:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.BENEFICIARY_COUNT_SUCCEEDED: {
      return {
        ...state,
        ...action.getBeneficiaryCount,
        loading: false,
      };
    }

    case AllBeneficiariesActionTypes.BENEFICIARY_COUNT_FAILED: {
      return {
        ...state,
        ...action.getBeneficiaryCount,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export const addApproveData_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.ADD_APPROVE_DATA:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.ADD_APPROVE_DATA_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        AddApproveComments: action.AddApproveComments,
      };
    }

    case AllBeneficiariesActionTypes.ADD_APPROVE_DATA_CHANGED: {
      return {
        ...state,
        loading: false,
        AddApproveComments: {
          ...state.AddApproveComments,
          success: false,
          message: "",
        },
        approveFlow: action.approveFlow,
      };
    }

    case AllBeneficiariesActionTypes.ADD_APPROVE_DATA_FAILED: {
      return {
        ...state,
        loading: false,
        AddApproveComments: action.AddApproveComments,
      };
    }

    default:
      return state;
  }
};

export const addRejectData_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.ADD_REJECT_DATA:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.ADD_REJECT_DATA_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        AddRejectComments: action.AddRejectComments,
      };
    }
    case AllBeneficiariesActionTypes.ADD_REJECT_DATA_CHANGED: {
      return {
        ...state,
        loading: false,
        AddRejectComments: {
          ...state.AddRejectComments,
          success: false,
          message: "",
        },
        rejectFlow: action.rejectFlow,
      };
    }
    case AllBeneficiariesActionTypes.ADD_REJECT_DATA_FAILED: {
      return {
        ...state,
        loading: false,
        AddRejectComments: action.AddRejectComments,
      };
    }
    case AllBeneficiariesActionTypes.EDIT_CLOSED: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const addInfoData_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.ADD_INFO_DATA:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.ADD_INFO_DATA_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        AddInfoComments: action.AddInfoComments,
      };
    }

    case AllBeneficiariesActionTypes.ADD_INFO_DATA_CHANGED: {
      return {
        ...state,
        loading: false,
        AddInfoComments: {
          ...state.AddInfoComments,
          success: false,
          message: "",
        },
        infoFlow: action.infoFlow,
      };
    }

    case AllBeneficiariesActionTypes.ADD_INFO_DATA_FAILED: {
      return {
        ...state,
        loading: false,
        AddInfoComments: action.AddInfoComments,
      };
    }

    default:
      return state;
  }
};

export const create_beneficiary_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.CREATE_BENEFICIARY:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.CREATE_BENEFICIARY_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        ...action.GetCreateBeneficiariesData,
        createBeneficiaryData: action.GetCreateBeneficiariesData,
        showAddBeneficiaryPopUp: false,
        changedValue: true,
      };
    }
    case AllBeneficiariesActionTypes.CREATE_BENEFICIARY_CHANGED: {
      return {
        ...state,
        loading: false,
        ...action.GetCreateBeneficiariesData,
        createBeneficiaryData: action.GetCreateBeneficiariesData,
        changedValue: action.changedValue,
      };
    }

    case AllBeneficiariesActionTypes.CREATE_BENEFICIARY_FAILED: {
      return {
        ...state,
        loading: false,
        ...action.GetCreateBeneficiariesData,
        createBeneficiaryData: action.GetCreateBeneficiariesData,
      };
    }
    case AllBeneficiariesActionTypes.ADD_BENEFICIARY_CLOSE: {
      return {
        ...state,
        showAddBeneficiaryPopUp: false,
      };
    }
    default:
      return state;
  }
};
export const getGroupLevel_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.GROUP_USERS:
      return {
        loading: true,
        ...state,
      };
    case AllBeneficiariesActionTypes.GROUP_USERS_SUCCEEDED: {
      let abc =
        action.GetGroupUsers &&
        action.GetGroupUsers.data.map((item) => ({
          label: item.name,
          value: item._id,
        }));
      return {
        ...state,
        loading: false,
        ...action.GetGroupUsers,
        groupUsersFilter: abc,
      };
      //let options={action.GetGroupUsers && state.GetGroupUsers.map(item => ({ label: item, value: item }))}
    }

    case AllBeneficiariesActionTypes.GROUP_USERS_FAILED: {
      return {
        ...state,
        loading: false,
        ...action.GetGroupUsers,
      };
    }

    default:
      return state;
  }
};
export const getBanksMaster_reducer = (
  state: IBankMaster = {},
  action: GetMasterBanksReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.GET_MASTER_BANKS:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.GET_MASTER_BANKS_SUCCEEDED: {
      return {
        ...action.banks,
      };
    }
    case AllBeneficiariesActionTypes.GET_MASTER_BANKS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};
export const Edit_Beneficiary_reducer = (
  state: AllBeneficiariesData = getAllBeneficiariesInitialState,
  action: AllBeneficiaryReducerActions
) => {
  switch (action.type) {
    case AllBeneficiariesActionTypes.BENEFICIARIES_EDIT:
      return {
        ...state,
        loading: true,
      };
    case AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        ...action.AllEditedBeneficiaries,
        showEditedRecord: true,
      };
    }
    case AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_CHANGED: {
      return {
        ...state,
        loading: false,
        ...action.AllEditedBeneficiaries,
        showEditedRecord: action.showEditedRecord,
        disableRecord: action.disableRecord,
      };
    }

    case AllBeneficiariesActionTypes.BENEFICIARIES_EDIT_FAILED: {
      return {
        ...state,
        loading: false,
        ...action.AllEditedBeneficiaries,
      };
    }
    case AllBeneficiariesActionTypes.EDIT_CLOSED: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
export const beneficiaryType_reducer = (state: any, action: any) => {
  let benType = {
    beneficiaryType: window.location.href.includes("pendingBeneficiaries")
      ? 2
      : 1,
  };
  switch (action.type) {
    case "SWITCH_BENEFICIARY_TYPE": {
      let benType = { ...state, beneficiaryType: action.beneficiaryType };
      return benType;
    }
    default:
      return benType;
  }
};
