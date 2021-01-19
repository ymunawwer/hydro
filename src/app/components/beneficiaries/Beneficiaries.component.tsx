import React, { useEffect, useState } from "react";
import "./Beneficiaries.scss";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../utils/Yup.validation";
import Popup from "reactjs-popup";
import { app_constants } from "../../utils/constants";
import * as Yup from "yup";
import { getDeviceInfo } from "../../utils/global";
import { PrimaryButton, Styledlabel } from "../../common/styled-components";
import NeedMore from "./features/NeedMore.component";
import SubmitMore from "./features/SubmitMoreInfo.component";
import ViewMore from "./features/ViewMore.component";
import Ireject from "./features/Reject.component";
import ApproveFlow from "./features/Approval.component";
import { getGroupId, grantModuleAccess } from "../../../app/utils/roleHelper";
import Select from "react-select";
import "../payments../../../common/snippets/box/box.scss";
import "../../common/tooltip/tooltip.scss";
import "../payments../../../common/snippets/box/box-ar.scss";
import "../../common/tooltip/tooltip-ar.scss";
import SelectStyle from "../../config/select";
import Button from "../../common/button/Button";
import { get } from "lodash";
import {
  IProps,
  ViewApproval,
  columns,
  IState,
  IRow,
  IEditRow,
  commentsData,
  IEditVal,
  AllBeneficiaryDetails,
  approveFlow,
  banksOption,
} from "./Beneficiaries.actionTypes";
import Datatable from "../../common/datatable/Datatable.component";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
const moment = require("moment");

const AllBeneficiaries = (props: IProps) => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({
    selectedRow: {},
    auditInfo: {},
    pageSize: app_constants.pageSize,
    initialPageSize: app_constants.pageSize,
    IsEditOpen: false,
    IsRejectOpen: false,
    IsInfoOpen: false,
    IsViewOpen: false,
    searchResults: undefined,
    transactionDetails: false,
    IsubmitInfoOpen: false,
    showAddPopup: false,
    viewMore: 3,
    actionToolTip: {},
    IsApproveOpen: false,
  } as IState);

  useEffect(() => {
    let id = getGroupId();
    let groupUser = {
      groupId: id,
      userId: props.loggedInUserId,
    };
    props.loggedInUserId &&
      props.loggedInUserId !== "" &&
      props.getGroupLevelUsers(groupUser);
    let user = {
      userId: props.loggedInUserId,
      myApproval: false,
    };
    let pendinguser = {
      userId: props.loggedInUserId,
      myApproval: true,
    };

    if (
      props.beneficiaryState &&
      props.loggedInUserId &&
      props.loggedInUserId !== "" &&
      (props.beneficiaryState.beneficiaryType === 1 ||
        props.beneficiaryState.beneficiaryType === "All Beneficiaries")
    ) {
      props.getAllBeneficiaries(undefined, 1, state.pageSize, user);
      props.getBeneficiaryBankCount(user);
    } else if (props.loggedInUserId && props.loggedInUserId !== "") {
      props.getAllBeneficiariesData(pendinguser);
      props.getAllBeneficiaries(undefined, 1, state.pageSize, pendinguser);
      props.getBeneficiaryBankCount(pendinguser);
    }
  }, [props.loggedInUserId]);
  //Action items toggle
  const toastr = (message: string) => {
    toast.success(message);
  };

  const itemsRef = React.useRef<any>([]);
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, state.pageSize);
  }, [state.pageSize]);
  const handleClickOutside = (event: any) => {
    if (
      itemsRef.current.length > 0 &&
      (itemsRef.current.indexOf(event.target) > -1 ||
        event.target.className === "avoidTooltipClose")
    ) {
      return;
    }
    Object.keys(state.actionToolTip).length > 0 &&
      setState({
        ...state,
        actionToolTip: {},
      });
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [state.actionToolTip]);
  //end here
  const countries = [
    { value: "BH", label: t("BHA") },
    { value: "EG", label: t("EGA") },
    { value: "IN", label: t("INA") },
    { value: "JO", label: t("JOA") },
    { value: "KW", label: t("KWA") },
    { value: "OM", label: t("OMA") },
    { value: "QA", label: t("QAA") },
    { value: "SA", label: t("SAA") },
    { value: "AE", label: t("AEA") },
  ];

  const getApprovalClass = (row: number, rowNumber: number) => {
    let approvalPosition = "empty normal";
    if (row === rowNumber) {
      approvalPosition = "circle normal";
    } else if (row > rowNumber) {
      approvalPosition = "reviewed normal";
    }
    return approvalPosition;
  };

  const showInfoToggle = (row?: IRow) => {
    let selectedrow = row !== undefined ? row : state.selectedRow;
    state.IsInfoOpen === false && props.handleInfoPopup(false);

    setState({
      ...state,
      IsInfoOpen: !state.IsInfoOpen,
      selectedRow: selectedrow,
      IsViewOpen:
        state.IsViewOpen === true ? !state.IsViewOpen : state.IsViewOpen,
      actionToolTip: {},
    });
  };

  const showApproveToggle = () => {
    state.IsApproveOpen === false && props.handleApprovePopup(false);
    setState({
      ...state,
      IsApproveOpen: !state.IsApproveOpen,
      IsViewOpen:
        state.IsViewOpen === true ? !state.IsViewOpen : state.IsViewOpen,
      actionToolTip: {},
    });
  };

  const showBeneficiaryList = () => {
    let user = {
      userId: props.loggedInUserId,
      myApproval: false,
    };
    let Pendinguser = {
      userId: props.loggedInUserId,
      myApproval: true,
    };
    if (
      props.beneficiaryState &&
      (props.beneficiaryState.beneficiaryType === 1 ||
        props.beneficiaryState.beneficiaryType === "All Beneficiaries")
    ) {
      props.getAllBeneficiaries(undefined, 1, state.pageSize, user);
      props.getBeneficiaryBankCount(user);
    } else if (
      props.beneficiaryState &&
      props.beneficiaryState.beneficiaryType === 2
    ) {
      props.getAllBeneficiaries(undefined, 1, state.pageSize, Pendinguser);
      props.getBeneficiaryBankCount(Pendinguser);
    }
  };

  useEffect(() => {
    props.submitData && props.submitData.success;
    if (props.submitData && props.submitData.success && state.IsubmitInfoOpen) {
      showInfoToggle();
      showBeneficiaryList();
      toastr(t("moreInfoAdded"));
      submitInfoToggle();
      props.handleSubmitPopup(false);
    }
  }, [props.submitData && props.submitData.success]);

  useEffect(() => {
    props.infoComments && props.infoComments.success;
    if (props.infoComments && props.infoComments.success && state.IsInfoOpen) {
      showInfoToggle();
      showBeneficiaryList();
      toastr(t("commentsAdded"));
      props.handleInfoPopup(false);
    }
  }, [props.infoComments && props.infoComments.success]);

  useEffect(() => {
    props.rejectComments && props.rejectComments.success;

    if (
      props.rejectComments &&
      props.rejectComments.success &&
      state.IsRejectOpen
    ) {
      showBeneficiaryList();
      showRejectToggle();
      toastr(t("rejectComments"));
      props.handleRejectPopup(false);
    }
  }, [props.rejectComments && props.rejectComments.success]);
  useEffect(() => {
    props.approveComments &&
      props.approveComments.success === false &&
      props.approveComments.message !== "" &&
      props.approveComments.data === null;
    if (
      props.approveComments &&
      props.approveComments.success === false &&
      state.IsApproveOpen === false &&
      props.approveComments.message !== "" &&
      props.approveComments.data === null
    ) {
      toastr(t("approveFailed"));
    }
  }, [
    props.approveComments &&
      props.approveComments.success === false &&
      props.approveComments.message !== "" &&
      props.approveComments.data === null,
  ]);

  useEffect(() => {
    props.approveComments && props.approveComments.success;

    if (
      props.approveComments &&
      props.approveComments.success &&
      !state.IsApproveOpen
    ) {
      props.handleApprovePopup(false);
      showBeneficiaryList();
      toastr(t("approvedSuccess"));
    } else if (
      state.IsApproveOpen &&
      props.approveComments &&
      props.approveComments.success
    ) {
      showBeneficiaryList();
      showApproveToggle();

      toastr(t("approvedSuccess"));
    }
  }, [props.approveComments && props.approveComments.success]);

  const submitInfoToggle = (row?: IEditRow) => {
    state.IsubmitInfoOpen === false && props.handleSubmitPopup(false);
    let selectedrow = row ? row : state.selectedRow;
    setState({
      ...state,
      selectedRow: selectedrow,
      IsubmitInfoOpen: !state.IsubmitInfoOpen,
      IsViewOpen:
        state.IsViewOpen === true ? !state.IsViewOpen : state.IsViewOpen,
      actionToolTip: {},
    });
  };

  const addModalToggle = () => {
    state.showAddPopup === false && props.getMasterBanks();
    setState({
      ...state,
      showAddPopup: !state.showAddPopup,
    });
  };
  const editModalToggle = (row?: IEditRow) => {
    state.IsEditOpen === false && props.getMasterBanks();
    setState({
      ...state,
      IsEditOpen: !state.IsEditOpen,
      selectedRow: row,
      actionToolTip: {},
    });
  };
  if (
    props.createBeneficiaryData.createBeneficiaryData &&
    props.createBeneficiaryData.createBeneficiaryData.data &&
    props.createBeneficiaryData.createBeneficiaryData.success &&
    state.showAddPopup &&
    props.addPopup
  ) {
    setTimeout(() => {
      props.handleAddPopup(false);
      addModalToggle();

      showBeneficiaryList();

      props.popupEditClose();
      !toast.isActive("editRecord") &&
        toast.success(
          !Array.isArray(props.createBeneficiaryData.data) && t("addedBnsSucc")
        );
    }, 0);
  }

  if (
    props.createBeneficiaryData.createBeneficiaryData &&
    props.createBeneficiaryData.createBeneficiaryData.success === false &&
    state.showAddPopup &&
    props.addPopup
  ) {
    setTimeout(() => {
      props.handleAddPopup(false);
      addModalToggle();
      props.popupEditClose();
      !toast.isActive("editRecord") &&
        toast.success(
          !Array.isArray(props.createBeneficiaryData.data) &&
            `${props.createBeneficiaryData.message}`
        );
    }, 0);
  }

  if (
    props.editedBeneficiaries &&
    props.editedBeneficiaries.data &&
    props.editedBeneficiaries.success &&
    state.IsEditOpen &&
    props.editedRow
  ) {
    setTimeout(() => {
      props.handleChangedData(props.editedBeneficiaries.data);

      showBeneficiaryList();
      props.showEditRecord(false);
      props.popupEditClose();
      editModalToggle();
      !toast.isActive("editRecord") &&
        toast.success(
          !Array.isArray(props.editedBeneficiaries.data) && t("editedBnsSucc")
        );
    }, 0);
  }

  if (
    props.editedBeneficiaries &&
    props.editedBeneficiaries.success &&
    !state.IsEditOpen &&
    !props.disabledRecord
  ) {
    setTimeout(() => {
      props.showDisableRecord(true);

      showBeneficiaryList();
      props.popupEditClose();

      !toast.isActive("editRecord") &&
        toast.success(
          !Array.isArray(props.editedBeneficiaries) &&
            props.editedBeneficiaries &&
            props.editedBeneficiaries.data &&
            t("bnsHasBn") +
              `${
                props.editedBeneficiaries.data.isActive
                  ? t("enabled")
                  : t("disabled")
              }`,
          { toastId: "disabledRecord" }
        );
    }, 0);
  }

  const disableBeneficiaries = (row: IRow) => {
    const beneficiary = {
      isActive: !row.original.isActive,
    };
    const id = row.original._id;
    props.showDisableRecord(false);

    let user = {
      userId: props.loggedInUserId,
      myApproval: false,
    };
    props.handlePendingEdit(beneficiary, id, user);
  };
  const showRejectToggle = (row?: IRow) => {
    let selectedrow = row ? row : state.selectedRow;
    state.IsRejectOpen === false && props.handleRejectPopup(true);
    setState({
      ...state,
      IsRejectOpen: !state.IsRejectOpen,
      selectedRow: selectedrow,
      actionToolTip: {},
      IsViewOpen:
        state.IsViewOpen === true ? !state.IsViewOpen : state.IsViewOpen,
    });
  };

  const approveData = (row: IRow) => {
    let rowValue = [];

    let rowId = row && row.original && row.original._id;
    let beneficiary = rowValue.push(rowId);
    let approvereq: approveFlow = {
      userId: props.loggedInUserId,
      beneficiaryId: rowValue,
      status: "Approved",
      comments: "Approved",
      lang: i18n.language,
    };
    if (rowId && rowId !== undefined && rowId !== null) {
      //props.handleApprovePopup(true);
      props.handleApprove(approvereq);
    }
  };

  const viewModalToggle = (row?: IRow) => {
    let benificiary = {
      beneficiaryId: row ? row.original._id : "",
      userId: props.loggedInUserId,
    };
    let selectedrow = row ? row : state.selectedRow;

    state.IsViewOpen === false &&
      selectedrow.original._id &&
      benificiary &&
      props.viewMore(benificiary);
    setState({
      ...state,
      IsViewOpen: !state.IsViewOpen,
      selectedRow: selectedrow,
      actionToolTip: {},
    });
  };

  let listItem: AllBeneficiaryDetails[] = [],
    columnsList: columns[] = [],
    loaderColumnsList = [
      {
        Header: t("dateInititor"),
        accessor: "createdDate",
        //Filter: CustomTableFilter,
      },
      {
        Header: t("benificiaryName"),
        accessor: "beneficiary_name",
      },
      {
        Header: t("bknName"),
        accessor: "bankName",
      },
      {
        Header: t("accNum"),
        accessor: "account_number",
      },
      {
        Header: t("iBan"),
        accessor: "ifscCode",
      },

      {
        Header: t("dateApprv"),
        accessor: "commentedBy",
      },
      {
        Header: t("status"),
        filterable: false,
      },
      {
        Header: t("actions"),
        filterable: false,
        width: 80,
        id: "actions",
      },
    ],
    loaderPendingList = [
      {
        Header: t("dateInititor"),
        accessor: "createdDate",
      },
      {
        Header: t("benificiaryName"),
        accessor: "beneficiary_name",
      },
      {
        Header: t("accNum"),
        accessor: "account_number",
      },
      {
        Header: t("iBan"),
        accessor: "ifscCode",
      },
      {
        Header: t("dateApprv"),
        accessor: "approver",
      },
      {
        Header: t("comments"),
        accessor: "comments",
      },
      {
        Header: t("actions"),
        width: 80,
        id: "actions",
      },
    ],
    PendingList: columns[] = [];
  if (
    props.GetBeneficiariesData.BeneficiariesList &&
    props.GetBeneficiariesData.BeneficiariesList.data
  ) {
    Array.isArray(props.GetBeneficiariesData.BeneficiariesList.data) &&
      props.GetBeneficiariesData.BeneficiariesList.data.forEach(
        (item: AllBeneficiaryDetails) => {
          listItem.push({
            _id: item._id,
            createdDate:
              moment(item.createdDate).format("DD/MM/yyyy") +
              "-" +
              item.createdBy,
            beneficiary_name: item.beneficiary_name,
            account_number: item.account_number,
            ifscCode: item.ifscCode,
            isActive: item.isActive,
            bankName: item.bankName,
            description: item.description,
            bankId: item.bankId,
            fk_bankId: item.fk_bankId,
            nick_name: item.nick_name,
            fk_approver_Id: item.fk_approver_Id,
            approval_status: item.approval_status,
            address: item.address,
            showMoreInfo: item.showMoreInfo,
            userApproved: item.userApproved,
            commentedBy: item.commentedBy
              ? item.commentedBy &&
                moment(item.commentDate).format("DD/MM/yyyy") +
                  "-" +
                  item.commentedBy
              : item.commentDate &&
                moment(item.commentDate).format("DD/MM/yyyy"),
            currentPosition: item.currentPosition,
            approvalLevels: item.approvalLevels,
            fk_userId: item.fk_userId,
            comments: item.comments ? item.comments : "",
            country: item.country
              ? item.country
              : {
                  label: "",
                  value: "",
                },

            //
          });
        }
      );

    PendingList = [
      {
        Header: t("dateInititor"),
        accessor: "createdDate",
      },
      {
        Header: t("benificiaryName"),
        accessor: "beneficiary_name",
      },
      {
        Header: t("accNumIBAN"),
        accessor: "account_number",
      },
      {
        Header: t("iBan"),
        accessor: "ifscCode",
      },
      {
        Header: t("dateApprv"),
        accessor: "approver",
      },
      // {
      //   Header: "Comments",
      //   accessor: "comments",
      // },
      {
        Header: () => (
          <div className="approverComment">
            <span>{t("comments")}</span>
            <div className="approverTag">
              {props.getBeneficiaryCount &&
                props.getBeneficiaryCount.data &&
                (props.getBeneficiaryCount.data.approvalLevels === 1 ||
                  props.getBeneficiaryCount.data.approvalLevels === 2 ||
                  props.getBeneficiaryCount.data.approvalLevels === 3) && (
                  <span
                    className={
                      props.getBeneficiaryCount &&
                      props.getBeneficiaryCount.data &&
                      props.getBeneficiaryCount.data.userRole === "reviewer"
                        ? "circled"
                        : "normal"
                    }
                  >
                    L1
                  </span>
                )}
              {props.getBeneficiaryCount &&
                props.getBeneficiaryCount.data &&
                (props.getBeneficiaryCount.data.approvalLevels === 2 ||
                  props.getBeneficiaryCount.data.approvalLevels === 3) && (
                  <span
                    className={
                      props.getBeneficiaryCount &&
                      props.getBeneficiaryCount.data &&
                      props.getBeneficiaryCount.data.userRole === "approver"
                        ? "circled"
                        : "normal"
                    }
                  >
                    L2
                  </span>
                )}
              {props.getBeneficiaryCount &&
                props.getBeneficiaryCount.data &&
                props.getBeneficiaryCount.data.approvalLevels === 3 && (
                  <span
                    className={
                      props.getBeneficiaryCount &&
                      props.getBeneficiaryCount.data &&
                      props.getBeneficiaryCount.data.userRole === "executor"
                        ? "circled"
                        : "normal"
                    }
                  >
                    L3
                  </span>
                )}
            </div>
          </div>
        ),
        accessor: "comments",
      },
      {
        Header: t("actions"),
        width: 80,
        id: "actions",
        Cell: (row: any) => {
          return (
            <div className="actionSection">
              <div
                className="icon-dots Cursor"
                ref={(el) => (itemsRef.current[row.index] = el)}
                onClick={() => {
                  const obj = { [row.index]: !state.actionToolTip[row.index] };
                  setState({
                    ...state,
                    actionToolTip: obj,
                  });
                }}
              ></div>

              {state.actionToolTip[row.index] && (
                <div className="transcationTooltip">
                  <div className="bottom">
                    <ul>
                      {//!props.groupAdmin &&
                      row &&
                        row.original &&
                        !row.original.userApproved &&
                        !row.original.showMoreInfo &&
                        (row.original.approval_status !== "Rejected" ||
                          row.original.approval_status !== "More info " ||
                          row.original.approval_status !== "Executed") &&
                        props.getBeneficiaryCount &&
                        props.getBeneficiaryCount.data &&
                        props.getBeneficiaryCount.data.userRole &&
                        props.getBeneficiaryCount.data.userRole !==
                          "undefined" &&
                        (props.getBeneficiaryCount.data.userRole ===
                          "reviewer" ||
                          props.getBeneficiaryCount.data.userRole ===
                            "approver" ||
                          props.getBeneficiaryCount.data.userRole ===
                            "executor") && (
                          <>
                            <li
                              className={
                                row.original.isActive === false
                                  ? " disabledClass"
                                  : ""
                              }
                              onClick={() => {
                                approveData(row);
                              }}
                            >
                              <span className="icon-check-circle green"></span>
                              {t("approve")}
                            </li>

                            <li
                              className={
                                row.original.isActive === false
                                  ? " disabledClass"
                                  : ""
                              }
                              onClick={() => showRejectToggle(row)}
                            >
                              <span className="icon-close-circle red"></span>
                              {t("reject")}
                            </li>
                            <li
                              className={
                                row.original.isActive === false
                                  ? " disabledClass"
                                  : ""
                              }
                              onClick={() => showInfoToggle(row)}
                            >
                              <span className="icon-info-circle info"></span>
                              {t("needMoreInfo")}
                            </li>
                            {props.loggedInUserId === row.original.fk_userId &&
                              row.original.approval_status ===
                                "In progress" && (
                                <li
                                  className={
                                    row.original.isActive === false
                                      ? " disabledClass"
                                      : ""
                                  }
                                  onClick={() => editModalToggle(row)}
                                >
                                  <span className="icon-Edit info"></span>
                                  {t("edit")}
                                </li>
                              )}
                          </>
                        )}
                      {row.original.showMoreInfo && (
                        <li
                          className={
                            row.original.isActive === false
                              ? " disabledClass"
                              : ""
                          }
                          onClick={() => submitInfoToggle(row)}
                        >
                          <span className="icon-check-circle green"></span>
                          Submit more info
                        </li>
                      )}
                      <li
                        className={
                          row.original.isActive === false
                            ? " disabledClass"
                            : ""
                        }
                        onClick={() => viewModalToggle(row)}
                      >
                        <span className="icon-view-more iconRadius"></span>
                        {t("viewMore")}
                      </li>
                      <li onClick={() => disableBeneficiaries(row)}>
                        <span className="icon-Disabled red"></span>
                        {row.original.isActive ? t("disable") : t("enable")}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        },
      },
    ];

    columnsList = [
      {
        Header: t("dateInititor"),
        accessor: "createdDate",
        //Filter: CustomTableFilter,
      },
      {
        Header: t("benificiaryName"),
        accessor: "beneficiary_name",
      },
      {
        Header: t("bknName"),
        accessor: "bankName",
      },
      {
        Header: t("accNumIBAN"),
        accessor: "account_number",
      },
      {
        Header: t("iBan"),
        accessor: "ifscCode",
      },

      {
        Header: t("dateApprv"),
        accessor: "commentedBy",
      },
      {
        Header: t("status"),
        filterable: false,
        Cell: (row: any) => (
          <div>
            {row.original.approval_status === "Executed" && (
              <span>Completed</span>
            )}
            {row.original.approval_status === "Rejected" && (
              <span>Rejected</span>
            )}
            {row.original.approval_status !== "Rejected" &&
              row.original.approval_status !== "Executed" && (
                <div>
                  <span className="approverTag">
                    {(row.original.approvalLevels === "1" ||
                      row.original.approvalLevels === "2" ||
                      row.original.approvalLevels === "3") && (
                      <span
                        className={getApprovalClass(
                          row.original.currentPosition + 1,
                          1
                        )}
                      >
                        L1
                      </span>
                    )}
                    {(row.original.approvalLevels === "2" ||
                      row.original.approvalLevels === "3") && (
                      <span
                        className={getApprovalClass(
                          row.original.currentPosition + 1,
                          2
                        )}
                      >
                        L2
                      </span>
                    )}
                    {row.original.approvalLevels === "3" && (
                      <span
                        className={getApprovalClass(
                          row.original.currentPosition + 1,
                          3
                        )}
                      >
                        L3
                      </span>
                    )}
                  </span>
                </div>
              )}
          </div>
        ),
      },
      {
        Header: t("actions"),
        filterable: false,
        width: 80,
        id: "actions",
        Cell: (row: any) => {
          return (
            <div className="actionSection">
              <div
                className="icon-dots Cursor"
                ref={(el) => (itemsRef.current[row.index] = el)}
                onClick={() => {
                  const obj = { [row.index]: !state.actionToolTip[row.index] };
                  setState({
                    ...state,
                    actionToolTip: obj,
                  });
                }}
              ></div>

              {state.actionToolTip[row.index] && (
                <div className="transcationTooltip">
                  <div className="bottom">
                    <ul>
                      {props.loggedInUserId === row.original.fk_userId &&
                        row.original.approval_status === "In progress" && (
                          <li
                            className={
                              row.original.isActive === false
                                ? " disabledClass avoidTooltipClose"
                                : "avoidTooltipClose"
                            }
                            onClick={() => editModalToggle(row)}
                          >
                            <span className="icon-Edit info"></span>
                            {t("edit")}
                          </li>
                        )}
                      <li
                        className={
                          row.original.isActive === false
                            ? "disabledClass avoidTooltipClose"
                            : "avoidTooltipClose"
                        }
                        onClick={() => viewModalToggle(row)}
                      >
                        <span className="icon-view-more"></span>
                        {t("viewMore")}
                      </li>
                      <li
                        // className={
                        //   row.original.isActive === false ? " disabledClass" : ""
                        // }
                        onClick={() => disableBeneficiaries(row)}
                      >
                        <span className="icon-Disabled red"></span>
                        {row.original.isActive ? t("disable") : t("enable")}
                      </li>
                      {row.original.approval_status === "More info" &&
                        props.getBeneficiaryCount &&
                        props.getBeneficiaryCount.data &&
                        props.getBeneficiaryCount.data.userRole &&
                        props.getBeneficiaryCount.data.userRole !==
                          "undefined" &&
                        props.getBeneficiaryCount.data.userRole ===
                          "initiator" && (
                          <li
                            className={
                              row.original.isActive === false
                                ? " disabledClass"
                                : ""
                            }
                            onClick={() => submitInfoToggle(row)}
                          >
                            <span className="icon-check-circle green"></span>
                            {t("submitMoreInfo")}
                          </li>
                        )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        },
      },
    ];
  }

  return (
    <div className="allUserProfileWrapper">
      <div className="allUserProfileContent">
        <div>
          {grantModuleAccess("MOD-19") && (
            <div>
              <div className="px-5">
                <div className="isFlex spacing mb-3">
                  <h1 className="title">
                    {props.beneficiaryState.beneficiaryType === 1 ||
                    props.beneficiaryState.beneficiaryType ===
                      "All Beneficiaries"
                      ? t("allBeneficiaries")
                      : t("pendingBeneficiaries")}
                  </h1>
                  {grantModuleAccess("MOD-18") && listItem.length > 0 && (
                    <Button
                      className="createBtn"
                      onClick={() => addModalToggle()}
                    >
                      {t("addNwBenificiary")}
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <div className="isFlex px-5">
                      {props.getBeneficiaryCount.loading ? (
                        <div className="transactionOverview">
                          <div className="boxLoader"></div>
                        </div>
                      ) : (
                        <div className="transactionOverview">
                          {/* props.getBeneficiaryCount &&
                          props.getBeneficiaryCount.data &&
                          props.getBeneficiaryCount.data.totalRecords */}
                          <span className="label">Total records</span>
                          <span className="totalItems amount">
                            {get(
                              props.getBeneficiaryCount,
                              "data.totalRecords",
                              "-"
                            )}
                          </span>
                        </div>
                      )}
                      {props.getBeneficiaryCount.loading ? (
                        <>
                          <div className="transactionOverview">
                            <div className="boxLoader"></div>
                          </div>
                          <div className="transactionOverview">
                            <div className="boxLoader"></div>
                          </div>
                          <div className="transactionOverview">
                            <div className="boxLoader"></div>
                          </div>
                        </>
                      ) : (
                        get(props.getBeneficiaryCount, "data.banks", [])
                          .slice(0, state.viewMore)
                          .map((bank: banksOption) => {
                            return (
                              <div className="transactionOverview">
                                <span className="label">{bank.bankName}</span>
                                <span className="totalItems amount">
                                  {bank.count}
                                </span>
                              </div>
                            );
                          })
                      )}

                      {get(props.getBeneficiaryCount, "data.banks", []).length >
                        3 && (
                        <div
                          onClick={() => {
                            setState({
                              ...state,
                              viewMore:
                                state.viewMore === 3
                                  ? props.getBeneficiaryCount.data.banks.length
                                  : 3,
                            });
                          }}
                          className="viewMoreLess transactionOverview softBlueColor Cursor arLineHgt"
                        >
                          {state.viewMore === 3
                            ? t("vwMoreBnk")
                            : t("viewLessBanks")}
                        </div>
                      )}
                    </div>
                    <div className="dataTable mt-1 beneficiaryTable">
                      {/* Data table not loading properly because of columns */}
                      <Datatable
                        listItem={listItem}
                        imageSrc={"/assets/images/No-benefciaries.png"}
                        clickMsg={
                          "Keep a track of all your Beneficiary Details at one single place."
                        }
                        buttonComponent={
                          <Button
                            className="createBtn"
                            onClick={() => addModalToggle()}
                          >
                            {t("addNwBenificiary")}
                          </Button>
                        }
                        loading={props.GetBeneficiariesData.loading}
                        columns={
                          props.beneficiaryState.beneficiaryType === 1 ||
                          props.beneficiaryState.beneficiaryType ===
                            "All Beneficiaries"
                            ? props.GetBeneficiariesData.loading
                              ? loaderColumnsList
                              : columnsList
                            : props.GetBeneficiariesData.loading
                            ? loaderPendingList
                            : PendingList
                        }
                        role={
                          props.getBeneficiaryCount &&
                          props.getBeneficiaryCount.data &&
                          props.getBeneficiaryCount.data.userRole
                        }
                        filterable={true}
                        pageSize={state.pageSize}
                        initialPageSize={state.initialPageSize}
                        totalRecords={
                          props.GetBeneficiariesData.totalRecords
                            ? props.GetBeneficiariesData.totalRecords
                            : 0
                        }
                        onPaginationChange={(
                          page: number,
                          pageSize?: number
                        ) => {
                          pageSize &&
                            setState({ ...state, pageSize: pageSize });
                          props.getAllBeneficiaries(
                            state.searchResults
                              ? { search: state.searchResults }
                              : undefined,
                            page,
                            pageSize ? pageSize : state.pageSize,
                            {
                              userId: props.loggedInUserId,
                              myApproval:
                                props.beneficiaryState.beneficiaryType === 1 ||
                                props.beneficiaryState.beneficiaryType ===
                                  "All Beneficiaries"
                                  ? false
                                  : true,
                            }
                          );
                          props.getBeneficiaryBankCount({
                            userId: props.loggedInUserId,
                            myApproval:
                              props.beneficiaryState.beneficiaryType === 1 ||
                              props.beneficiaryState.beneficiaryType ===
                                "All Beneficiaries"
                                ? false
                                : true,
                          });
                        }}
                        isSearch={state.searchResults}
                        module="Beneficiaries"
                      />
                    </div>
                  </div>
                </div>

                <ToastContainer
                  className="toastContainer"
                  toastClassName="toastBody"
                  hideProgressBar={true}
                  position={"bottom-center"}
                  //autoClose={500000}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Popup
        open={state.IsEditOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 612 }}
        lockScroll={true}
      >
        <div className="beneficiaryPopup">
          <h3>
            {t("editBeneficiary")}
            <span
              className="icon icon-Close-outline-button Cursor"
              onClick={() => editModalToggle()}
            ></span>
          </h3>
          <Formik
            initialValues={state.selectedRow && state.selectedRow.original}
            validationSchema={Yup.object({
              beneficiary_name: Yup.string()
                .min(3, i18n.t("benNamMin"))
                .max(50, i18n.t("benNamMax"))
                .matches("^[a-zA-Z ]+$", i18n.t("onlyEnglish"))
                .required(i18n.t("bEenBNameReq")),
              nick_name: Yup.string()
                .min(3, i18n.t("benNicMin"))
                .required(i18n.t("benNicReq"))
                .matches("^[a-zA-Z ]+$", i18n.t("onlyEnglish"))
                .max(50, i18n.t("benNicMax")),
              fk_bankId: Yup.string().required(i18n.t("benBnkReq")),

              account_number: Yup.string()
                .min(3, i18n.t("benAccMin"))
                .max(50, i18n.t("benAccMax"))
                .matches("^[a-zA-Z 0-9!-_@#$%* ]+$", i18n.t("onlyEnum"))
                .required(i18n.t("benAccReq")),
              ifscCode: Yup.string()

                .min(3, i18n.t("beniBanMin"))
                .max(50, i18n.t("beniBanMax"))
                .matches("^[a-zA-Z 0-9!-_@#$%* ]+$", i18n.t("onlyEnum"))
                .required(i18n.t("beniBanReq")),
              address: Yup.string()
                .min(3, i18n.t("benAddMin"))
                .max(30, i18n.t("cAddMax"))
                .matches("^[a-zA-Z 0-9!-_@#$%* ]+$", i18n.t("onlyEnum"))
                .required(i18n.t("benAddrReq")),
              description: Yup.string()
                .min(3, i18n.t("benDescMin"))
                .max(50, i18n.t("benDescMax"))
                .matches("^[a-zA-Z 0-9 ]+$", i18n.t("onlyAlphanum"))
                .required(i18n.t("benDescReq")),
              country: Yup.string().required(i18n.t("benCouReq")),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const beneficiary = {
                account_number: values.account_number,
                beneficiary_name: values.beneficiary_name,
                nick_name: values.nick_name,
                ifscCode: values.ifscCode,
                fk_bankId:
                  values.fk_bankId && values.fk_bankId.value
                    ? values.fk_bankId.value
                    : values.fk_bankId,
                modifiedBy: props.loggedInUserId,
                address: values.address,
                lang: i18n.language,
                //fk_company_id: props.loggedInCompany,
                fk_approver_Id:
                  values.fk_approver_Id && values.fk_approver_Id.value
                    ? values.fk_approver_Id.value
                    : values.fk_approver_Id,
                country: values.country ? values.country : "",
              };

              //props.createBeneficiary(beneficiary);
              props.showEditRecord(true);
              props.handlePendingEdit(beneficiary, values._id);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="createBeneficiaryMain">
                  <div className="createPaymentPopUp">
                    <Styledlabel
                      htmlFor="beneficiary_name"
                      className="allUserLabel"
                    >
                      {t("benificiaryName")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="beneficiary_name"
                        className="formField w-100"
                        type="text"
                        autoComplete="off"
                      />
                      <div className="errorMessage mb--10">
                        <ErrorMessage name="beneficiary_name" />
                      </div>
                    </div>
                  </div>
                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="nick_name" className="allUserLabel">
                      {t("nickName")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="nick_name"
                        className="formField w-100"
                        type="text"
                        autoComplete="off"
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="nick_name" />
                      </div>
                    </div>
                  </div>
                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="fk_bankId">
                      {t("bknName")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Select
                        className="selectOptionFont"
                        options={Object.values(props.banks)}
                        name="fk_bankId"
                        onChange={(selecetedOption: any) => {
                          setFieldValue("fk_bankId", selecetedOption);
                        }}
                        value={props.banks && props.banks[values.fk_bankId]}
                        styles={SelectStyle}
                        placeholder={t("select")}
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="fk_bankId" />
                      </div>
                    </div>
                  </div>
                  {props.groupAdmin && (
                    <div className="formControl">
                      <Styledlabel htmlFor="fk_approver_Id">
                        {t("approver")}
                      </Styledlabel>{" "}
                      <Select
                        className="selectOptionFont"
                        options={Object.values(
                          props.groupusers.groupUsersFilter
                        )}
                        name="fk_approver_Id"
                        onChange={(selecetedOption: any) => {
                          setFieldValue("fk_approver_Id", selecetedOption);
                        }}
                        styles={SelectStyle}
                        value={
                          values &&
                          props.groupusers.groupUsersFilter.filter((item) => {
                            return values.fk_approver_Id === item.value && item;
                          })[0]
                        }
                        placeholder={t("select")}
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="fk_approver_Id" />
                      </div>
                    </div>
                  )}
                  <div className="createPaymentPopUp">
                    <Styledlabel
                      htmlFor="account_number"
                      className="allUserLabel"
                    >
                      {t("accNumIBAN")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="account_number"
                        className="formField w-100"
                        type="text"
                        autoComplete="off"
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="account_number" />
                      </div>
                    </div>
                  </div>
                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="ifscCode" className="allUserLabel">
                      {t("iBan")}
                    </Styledlabel>
                    <div className="allUserSlct flex">
                      <Field
                        name="ifscCode"
                        className="formField w-47"
                        type="text"
                        autoComplete="off"
                      />
                      <Select
                        className="selectOptionFont w-47"
                        name="country"
                        isSearchable={false}
                        options={countries}
                        //value={countries && values.country}
                        value={
                          values
                            ? {
                                label: countries.map((item: reactlist) => {
                                  return (
                                    values.country === item.value && item.label
                                  );
                                }),
                                value: values.country,
                              }
                            : { label: "", value: "" }
                        }
                        onChange={(selectedOption: any) => {
                          setFieldValue("country", selectedOption.value);
                        }}
                        styles={SelectStyle}
                        placeholder={t("selectCountry")}
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="ifscCode" />
                      </div>
                    </div>
                  </div>

                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="address" className="allUserLabel">
                      {t("beneficiaryAddress")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="address"
                        className="formField w-100"
                        type="text"
                        autoComplete="off"
                        component="textarea"
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="address" />
                      </div>
                    </div>
                  </div>

                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="description" className="allUserLabel">
                      {t("desc")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="description"
                        className="formField w-100"
                        type="text"
                        autoComplete="off"
                        component="textarea"
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="description" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="createPaymentPopUp createPaymentBtn">
                  <div></div>
                  <button
                    className={`w70 btn-primary ${
                      props.editbBenificiaryLoading ? "loadBtn" : ""
                    }`}
                    type="submit"
                  >
                    {props.editbBenificiaryLoading ? "Editing" : t("edit")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Popup>

      <Popup
        //open={state.IsEditOpen}
        open={state.showAddPopup}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 612 }}
        lockScroll={true}
      >
        <div className="beneficiaryPopup">
          <h3>
            {t("addBeneficiary")}
            <span
              className="icon icon-Close-outline-button Cursor"
              onClick={() => addModalToggle()}
            ></span>
          </h3>
          <Formik
            initialValues={{
              beneficiary_name: "",
              nick_name: "",
              lang: "",
              account_number: "",
              ifscCode: "",
              description: "",
              address: "",
              country: "",
              comments: "",
              fk_bankId: "",
            }}
            validationSchema={yupSchema.BeneficiaryForm}
            onSubmit={(values: AllBeneficiaryDetails) => {
              const beneficiary = {
                ...values,
                fk_bankId:
                  values.fk_bankId && values.fk_bankId.value
                    ? values.fk_bankId.value
                    : values.fk_bankId,
                fk_userId: props.loggedInUserId,
                fk_company_id: props.loggedInCompany,
                lang: i18n.language,
                fk_approver_Id:
                  values.fk_approver_Id && values.fk_approver_Id.value
                    ? values.fk_approver_Id.value
                    : values.fk_approver_Id,
                country:
                  values.country && values.country.value
                    ? values.country.value
                    : "",
              };
              props.handleAddPopup(true);
              !props.allBeneficiaries.value &&
                props.createBeneficiary(beneficiary);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="createBeneficiaryMain">
                  <div className="createPaymentPopUp">
                    <Styledlabel
                      htmlFor="beneficiary_name"
                      className="allUserLabel"
                    >
                      {t("benificiaryName")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="beneficiary_name"
                        type="text"
                        autoComplete="off"
                        className="formField w-100"
                      />

                      <div className="errorMessage">
                        <ErrorMessage name="beneficiary_name" />
                      </div>
                    </div>
                  </div>

                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="nick_name" className="allUserLabel">
                      {t("nickName")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="nick_name"
                        className="formField w-100"
                        type="text"
                        autoComplete="off"
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="nick_name" />
                      </div>
                    </div>
                  </div>

                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="fk_bankId">
                      {t("bknName")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Select
                        className="selectOptionFont"
                        options={Object.values(props.banks)}
                        name="fk_bankId"
                        onChange={(selecetedOption: any) => {
                          setFieldValue("fk_bankId", selecetedOption);
                        }}
                        placeholder={t("select")}
                        styles={SelectStyle}
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="fk_bankId" />
                      </div>
                    </div>
                  </div>

                  {props.groupAdmin && (
                    <>
                      <div className="createPaymentPopUp">
                        <Styledlabel
                          htmlFor="fk_approver_Id"
                          className="allUserLabel"
                        >
                          {t("approver")}
                        </Styledlabel>
                        <div className="allUserSlct">
                          <Select
                            className="selectOptionFont"
                            options={Object.values(
                              props.groupusers.groupUsersFilter
                            )}
                            name="fk_approver_Id"
                            onChange={(selecetedOption: any) => {
                              setFieldValue("fk_approver_Id", selecetedOption);
                            }}
                            styles={SelectStyle}
                            placeholder={t("select")}
                          />
                          <div className="errorMessage">
                            <ErrorMessage name="fk_approver_Id" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="createPaymentPopUp">
                    <Styledlabel
                      htmlFor="account_number"
                      className="allUserLabel"
                    >
                      {t("accNumIBAN")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="account_number"
                        className="formField w-100"
                        type="text"
                        autoComplete="off"
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="account_number" />
                      </div>
                    </div>
                  </div>

                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="ifscCode" className="allUserLabel">
                      {t("iBan")}
                    </Styledlabel>
                    <div className="allUserSlct isFlex IbanField">
                      <div className="IbanFieldWidth">
                        <Field
                          name="ifscCode"
                          className="formField"
                          type="text"
                          autoComplete="off"
                        />
                        <div className="errorMessage">
                          <ErrorMessage name="ifscCode" />
                        </div>
                      </div>
                      <div className="IbanWidth ml-2">
                        <Select
                          className="selectOptionFont"
                          name="country"
                          isSearchable={false}
                          options={countries}
                          onChange={(date) => setFieldValue("country", date)}
                          styles={SelectStyle}
                          placeholder={t("selectCountry")}
                        />
                        <div className="errorMessage">
                          <ErrorMessage name="country" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="address" className="allUserLabel">
                      {t("beneficiaryAddress")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="address"
                        className="formField w-100"
                        type="text"
                        autoComplete="off"
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="address" />
                      </div>
                    </div>
                  </div>

                  <div className="createPaymentPopUp">
                    <Styledlabel htmlFor="description" className="allUserLabel">
                      {t("desc")}
                    </Styledlabel>
                    <div className="allUserSlct">
                      <Field
                        name="description"
                        className="formField w-100"
                        type="textarea"
                        autoComplete="off"
                        component="textarea"
                      />
                      <div className="errorMessage">
                        <ErrorMessage name="description" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="createPaymentPopUp createPaymentBtn">
                  <div></div>
                  <button
                    className={`w70 btn-primary ${
                      props.createBeneficiaryData.loading ? "loadBtn" : ""
                    }`}
                    type="submit"
                  >
                    {props.createBeneficiaryData.loading
                      ? t("addingBenificiary")
                      : t("addBenificiary")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Popup>

      <Popup
        open={state.IsViewOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 632 }}
        lockScroll={true}
      >
        {props.ViewMoreData && (
          <ViewMore
            {...props}
            hideViewInfo={() => viewModalToggle()}
            approvalRequest={state.selectedRow}
            toastr={(message: string) => toastr(message)}
            hideRejectInfo={() => showRejectToggle()}
            hideNeedInfo={() => showInfoToggle()}
            hideApprove={() => showApproveToggle()}
            hideSubmitInfo={() => submitInfoToggle()}
          />
        )}
      </Popup>

      <Popup
        open={state.IsRejectOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 440 }}
      >
        <Ireject
          {...props}
          hideRejectInfo={() => showRejectToggle()}
          approvalRequest={state.selectedRow}
          toastr={(message: string) => toastr(message)}
        />
      </Popup>

      <Popup
        // Need more info
        open={state.IsInfoOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 440 }}
      >
        <NeedMore
          {...props}
          hideNeedInfo={() => showInfoToggle()}
          approvalRequest={state.selectedRow}
          toastr={(message: string) => toastr(message)}
        />
      </Popup>

      <Popup
        open={false}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        className="modalSmPop"
      >
        <div className="modalBody">
          <div className="modalHeader">
            <div className="flexSb">
              <h2 className="popTitle  p-4 flexew">Need More Info</h2>
              <div
                className="icon-Close-outline-button p-4 closeBtn"
                onClick={() => showInfoToggle()}
              ></div>
            </div>
          </div>
        </div>
      </Popup>

      <Popup
        open={state.IsApproveOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 440 }}
      >
        <ApproveFlow
          {...props}
          hideApprove={() => showApproveToggle()}
          approvalRequest={state.selectedRow}
          toastr={(message: string) => toastr(message)}
        />
      </Popup>

      <Popup
        open={state.IsubmitInfoOpen}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 440 }}
      >
        <SubmitMore
          {...props}
          hideSubmitInfo={() => submitInfoToggle()}
          approvalRequest={state.selectedRow}
          toastr={(message: string) => toastr(message)}
        />
      </Popup>
    </div>
  );
};

export default AllBeneficiaries;
