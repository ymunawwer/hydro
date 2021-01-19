import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import Pagination from "./Pagination.component";
import "react-table/react-table.css";
import { Tooltip } from "../../common/tooltip/tooltip.component";
import "./Pagination.scss";
import { app_constants } from "../../utils/constants";
import PreLoaderDataTable from "./Datatable.Preloader.component";
import { useTranslation } from "react-i18next";

const _find = require("lodash.find");

export interface IProps {
  loading?: boolean;
  noDataMsg?: string;
  listItem: any;
  filterable: boolean;
  columns: any;
  pageSize?: number;
  totalRecords?: number;
  getTrProps?: any;
  editModal?: (row: any) => void;
  showRecord?: (row: any) => void;
  showModal?: (row: any) => void;
  editBenificiary?: (row: any) => void;
  viewModalToggle?: (row: any) => void;
  viewMore?: (row: any) => void;
  disableBenificiary?: (row: any) => void;
  viewRow?: (row: any) => void;
  showLevels?: (row: any) => void;
  showEdit?: (row: any) => void;
  showBeneficiary?: (row: any) => void;
  approveModal?: (row: any) => void;
  viewInfo?: (row: any) => void;
  role?: string | null | undefined;
  groupAdmin?: boolean;
  userId?: string | null | undefined;
  rejectModal?: (row: any) => void;
  infoModal?: (row: any) => void;
  deleteModal?: (row: any) => void;
  onPaginationChange?: (page: number, pageSize?: number) => void;
  initialPageSize?: number;
  changePage?: (page: number) => void;
  activePage?: number;
  isSearch?: string | undefined;
  disableRecord?: (row: any) => void;
  actionModal?: (row: any) => void;
  module?: string;
  actionToolTip?: boolean;
  showActionToolTip?: () => void;
  buttonComponent?: React.ReactNode;
  imageSrc?: string;
  clickMsg?: string;
}

const NoRecordFound = () => {
  return (
    <div className="noRecordFound errormessage">
      <img
        className="errorimage"
        src="/assets/images/Error-icon.png"
        alt="logo"
      />
      No records found
    </div>
  );
};

const Datatable = (props: IProps) => {
  const { t } = useTranslation();
  const [hoveredRow, setHoveredRow] = useState({
    selectedRow: {},
    pageSize: app_constants.pageSize,
    initialPageSize: app_constants.pageSize,
    selectHeader: false,
    selectedRowBox: false,
    searchResults: undefined,
  } as any);
  const {
    listItem,
    filterable,
    columns,
    editModal,
    showModal,
    editBenificiary,
    viewMore,
    disableBenificiary,
    viewRow,
    showLevels,
    showEdit,
    approveModal,
    viewInfo,
    role,
    groupAdmin,
    userId,
    rejectModal,
    infoModal,
    deleteModal,
    disableRecord,
    actionModal,
    showBeneficiary,
  } = props;
  const dataTableState = {
    filtered: [],
    pageSize: props.pageSize,
    totalRecords: props.totalRecords,
    activePage: 1,
    columnsInitialCount: columns.length,
  };
  const [state, setState] = useState(dataTableState as any);

  useEffect(() => {
    setState({ ...state, activePage: 1, pageSize: props.initialPageSize });
  }, [props.isSearch]);
  const getApprovalClass = (row: number, rowNumber: number) => {
    // (row.original.currentPosition === 1 ? "circle" : "empty") ||
    // (row.original.currentPosition > 1 ? "reviewed" : "empty")\
    let approvalPosition = "empty";
    if (row === rowNumber) {
      approvalPosition = "circle";
    } else if (row > rowNumber) {
      approvalPosition = "reviewed";
    }
    return approvalPosition;
  };
  // if (columns.length > 0 && state.columnsInitialCount === columns.length) {
  //   showBeneficiary &&
  //     columns.push({
  //       Header: "Status",
  //       filterable: false,
  //       Cell: (row: any) => (
  //         <div>
  //           {row.original.approval_status === "Executed" ? (
  //             <span>Completed</span>
  //           ) : (
  //             <span>
  //               {row.original.approvalLevels === 1 ||
  //                 row.original.approvalLevels === 2 ||
  //                 (row.original.approvalLevels === 3 && (
  //                   <span
  //                     className={getApprovalClass(
  //                       row.original.currentPosition,
  //                       1
  //                     )}
  //                   >
  //                     L1
  //                   </span>
  //                 ))}
  //               {row.original.approvalLevels === 2 ||
  //                 (row.original.approvalLevels === 3 && (
  //                   <span
  //                     className={getApprovalClass(
  //                       row.original.currentPosition,
  //                       2
  //                     )}
  //                   >
  //                     L2
  //                   </span>
  //                 ))}
  //               {row.original.approvalLevels === 3 && (
  //                 <span
  //                   className={getApprovalClass(
  //                     row.original.currentPosition,
  //                     3
  //                   )}
  //                 >
  //                   L3
  //                 </span>
  //               )}
  //             </span>
  //           )}
  //         </div>
  //       ),
  //     });
  editModal &&
    !_find(columns, { Header: "Edit" }) &&
    columns.push({
      Header: "Edit",
      filterable: false,
      width: 70,
      Cell: (row: any) => (
        <div
          className={
            row.original.isActive === false
              ? "icon-Edit disabledClass"
              : "icon-Edit"
          }
          onClick={() => {
            editModal(row);
          }}
        ></div>
      ),
    });
  //   editBenificiary &&
  //     disableBenificiary &&
  //     viewMore &&
  //     showLevels &&
  //     props.module !== "payments" &&
  //     columns.push({
  //       Header: "Actions",
  //       id: "actions",
  //       Cell: (row: any) => {
  //         var showToolTip = false;
  //         console.log(row);
  //         return (
  //           <div>
  //             <div className="transcationsTooltip">
  //               <div className="bottom">
  //                 <ul>
  //                   {userId === row.original.fk_userId && (
  //                     <li
  //                       className={
  //                         row.original.isActive === false
  //                           ? " disabledClass"
  //                           : ""
  //                       }
  //                       onClick={() => editBenificiary(row)}
  //                     >
  //                       <span className="icon-check-circle green"></span>
  //                       Edit!
  //                     </li>
  //                   )}
  //                   <li
  //                     className={
  //                       row.original.isActive === false ? " disabledClass" : ""
  //                     }
  //                     onClick={() => viewMore(row)}
  //                   >
  //                     <span className="icon-check-circle green"></span>
  //                     View More
  //                   </li>
  //                   <li
  //                     // className={
  //                     //   row.original.isActive === false ? " disabledClass" : ""
  //                     // }
  //                     onClick={() => disableBenificiary(row)}
  //                   >
  //                     <span className="icon-check-circle green"></span>
  //                     {row.original.isActive ? "Disable!" : "Enable"}
  //                   </li>
  //                   {row.original.approval_status === "More info" &&
  //                     role &&
  //                     role !== "undefined" &&
  //                     role === "initiator" && (
  //                       <li
  //                         className={
  //                           row.original.isActive === false
  //                             ? " disabledClass"
  //                             : ""
  //                         }
  //                         onClick={() => showLevels(row)}
  //                       >
  //                         <span className="icon-check-circle green"></span>
  //                         Submit More Info
  //                       </li>
  //                     )}
  //                 </ul>
  //               </div>
  //             </div>

  //             <div className="actionSection">
  //               <div className="icon-dots Cursor"></div>
  //             </div>
  //           </div>
  //         );
  //       },
  //     });

  //   editBenificiary &&
  //     disableBenificiary &&
  //     approveModal &&
  //     rejectModal &&
  //     viewInfo &&
  //     viewRow &&
  //     props.module !== "payments" &&
  //     columns.push({
  //       Header: "Actions",
  //       id: "actions",
  //       Cell: (row: any) => {
  //         var showToolTip = false;
  //         return (
  //           <div>
  //             <div className="transcationsTooltip">
  //               <div className="bottom">
  //                 <ul>
  //                   {groupAdmin && row.original.fk_approver_Id === userId && (
  //                     <div>
  //                       <li
  //                         className={
  //                           row.original.isActive === false
  //                             ? " disabledClass"
  //                             : ""
  //                         }
  //                         onClick={() => approveModal(row)}
  //                       >
  //                         <span className="icon-check-circle green"></span>
  //                         Approve
  //                       </li>
  //                       <li
  //                         className={
  //                           row.original.isActive === false
  //                             ? " disabledClass"
  //                             : ""
  //                         }
  //                         onClick={() => rejectModal(row)}
  //                       >
  //                         <span className="icon-check-circle green"></span>
  //                         Reject
  //                       </li>
  //                       <li
  //                         className={
  //                           row.original.isActive === false
  //                             ? " disabledClass"
  //                             : ""
  //                         }
  //                         onClick={() => viewInfo(row)}
  //                       >
  //                         <span className="icon-check-circle green"></span>
  //                         Info
  //                       </li>
  //                       <br />
  //                     </div>
  //                   )}
  //                   {!groupAdmin &&
  //                     row &&
  //                     row.original &&
  //                     (row.original.approval_status !== "Rejected" ||
  //                       row.original.approval_status !== "More info " ||
  //                       row.original.approval_status !== "Executed") &&
  //                     role &&
  //                     role !== "undefined" &&
  //                     (role === "reviewer" ||
  //                       role === "approver" ||
  //                       role === "executor") && (
  //                       <div>
  //                         {
  //                           <li
  //                             className={
  //                               row.original.isActive === false
  //                                 ? " disabledClass"
  //                                 : ""
  //                             }
  //                             onClick={() => approveModal(row)}
  //                           >
  //                             <span className="icon-check-circle green"></span>
  //                             Approve
  //                           </li>
  //                         }
  //                         <li
  //                           className={
  //                             row.original.isActive === false
  //                               ? " disabledClass"
  //                               : ""
  //                           }
  //                           onClick={() => rejectModal(row)}
  //                         >
  //                           <span className="icon-check-circle green"></span>
  //                           Reject
  //                         </li>
  //                         <li
  //                           className={
  //                             row.original.isActive === false
  //                               ? " disabledClass"
  //                               : ""
  //                           }
  //                           onClick={() => viewInfo(row)}
  //                         >
  //                           <span className="icon-check-circle green"></span>
  //                           Info
  //                         </li>
  //                         <br />
  //                       </div>
  //                     )}
  //                   {userId === row.original.fk_userId && (
  //                     <li
  //                       className={
  //                         row.original.isActive === false
  //                           ? " disabledClass"
  //                           : ""
  //                       }
  //                       onClick={() => editBenificiary(row)}
  //                     >
  //                       <span className="icon-check-circle green"></span>
  //                       Edit!
  //                     </li>
  //                   )}
  //                   <li
  //                     className={
  //                       row.original.isActive === false ? " disabledClass" : ""
  //                     }
  //                     onClick={() => viewRow(row)}
  //                   >
  //                     <span className="icon-check-circle green"></span>
  //                     View More
  //                   </li>
  //                   <li onClick={() => disableBenificiary(row)}>
  //                     <span className="icon-check-circle green"></span>
  //                     {row.original.isActive ? "Disable!" : "Enable"}
  //                   </li>
  //                 </ul>
  //               </div>
  //             </div>
  //             <div className="actionSection">
  //               <div className="icon-dots Cursor"></div>
  //             </div>
  //           </div>
  //         );
  //       },
  //     });

  //   deleteModal &&
  //     columns.push({
  //       Header: "Delete",
  //       filterable: false,
  //       width: 80,
  //       Cell: (row: any) => (
  //         <div className="icon-trash" onClick={() => deleteModal(row)}></div>
  //       ),
  //     });
  disableRecord &&
    !_find(columns, { Header: "Disable" }) &&
    columns.push({
      Header: "Disable",
      filterable: false,
      width: 80,
      Cell: (row: any) => (
        <div
          onClick={() => disableRecord(row)}
          className={
            row.original.isActive === false
              ? "icon-Disabled"
              : "icon-Disabled enabledClass"
          }
        ></div>
      ),
    });
  //   actionModal &&
  //     props.module !== "payments" &&
  //     columns.push({
  //       Header: "Actions",
  //       filterable: false,
  //       width: 80,
  //       Cell: (row: any) => {
  //         const [showToolTip, switchToolTip] = useState(false);
  //         // tooltip needs to get on outside click.. Still need to work ont his.. - Shoeb
  //         return (
  //           <div className="actionSection">
  //             <div
  //               className="icon-dots Cursor"
  //               onClick={() => switchToolTip(!showToolTip)}
  //               onBlur={() => switchToolTip(!showToolTip)}
  //               onFocus={() => switchToolTip(!showToolTip)}
  //             ></div>
  //             {showToolTip && (
  //               <Tooltip
  //                 transactions="toolTip"
  //                 anyFunc={() => actionModal(row)}
  //               />
  //             )}
  //           </div>
  //         );
  //       },
  //     });

  //   //Payments actions
  //   // if (props.module === "payments") {
  //   //   columns.push({
  //   //     Header: "Actions",
  //   //     filterable: false,
  //   //     width: 80,
  //   //     id: "actions",
  //   //     Cell: (row: any) => {
  //   //       const [showToolTip, switchToolTip] = useState(false);
  //   //       return (
  //   //         <div className="actionSection">
  //   //           <div
  //   //             className="icon-dots Cursor"
  //   //             onClick={() => switchToolTip(!showToolTip)}
  //   //           ></div>
  //   //           {showToolTip && (
  //   //             <Tooltip jsx={true} content={<PaymentsActionsToolTip />} />
  //   //           )}
  //   //         </div>
  //   //       );
  //   //     },
  //   //   });
  //   // }
  // }

  const onFilteredChangeCustom = (value: any, accessor: any) => {
    let insertNewFilter = 1;
    if (state.filtered.length) {
      state.filtered.forEach((filter: any, i: any) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) state.filtered.splice(i, 1);
          else filter["value"] = value;
          insertNewFilter = 0;
        }
      });
    }
    if (insertNewFilter) {
      state.filtered.push({ id: accessor, value: value });
    }
    setState({ ...state, filtered: state.filtered });
  };

  const onDefaultFilterMethod = (filter: any, row: any, column: any) => {
    const id = filter.pivotId || filter.id;
    if (typeof filter.value === "object") {
      return row[id] !== undefined ? filter.value.indexOf(row[id]) > -1 : true;
    } else {
      return row[id] !== undefined
        ? String(row[id]).indexOf(filter.value) > -1
        : true;
    }
  };

  const changePageSize = (pagesize: number) => {
    setState({ ...state, pageSize: pagesize });
  };

  const changePage = (page: number) => {
    setState({ ...state, activePage: page });
  };

  const customProps = {
    customPageSize: (pageSize: number) => changePageSize(pageSize),
    totalRecords: props.totalRecords,
    onPaginationChange: props.onPaginationChange,
    initialPageSize: props.initialPageSize,
    changePage: (page: number) => changePage(page),
    activePage: state.activePage,
    module: props.module,
  };

  let totalPages =
    props.totalRecords && props.pageSize && props.totalRecords / props.pageSize;
  totalPages && totalPages % 1 !== 0 && (totalPages = Math.ceil(totalPages));

  if (props.loading) {
    return (
      <div>
        <PreLoaderDataTable columns={columns} />
      </div>
    );
  }

  return (
    <div>
      {props.listItem && props.listItem.length > 0 ? (
        <div>
          <ReactTable
            getTrProps={({}, rowInfo: any) => {
              if (
                rowInfo &&
                rowInfo.original &&
                (rowInfo.original.isReconcile === true ||
                  rowInfo.original.isReconcile === false)
              ) {
                return {
                  className: rowInfo.original.isReconcile
                    ? "reconsole"
                    : "notReconsole",
                };
              }
              return {
                className:
                  rowInfo &&
                  rowInfo.original &&
                  rowInfo.original.isActive === false &&
                  "activeClick",
              };
            }}
            getTheadThProps={() => {
              return {
                className: "tableHeader",
              };
            }}
            PaginationComponent={Pagination}
            data={listItem}
            filterable={filterable}
            resizable={false}
            onFilteredChange={(filtered, column, value) => {
              onFilteredChangeCustom(value, column.id || column.accessor);
            }}
            defaultFilterMethod={(filter, row, column) => {
              return onDefaultFilterMethod(filter, row, column);
            }}
            columns={columns}
            defaultPageSize={props.pageSize}
            pageSize={
              listItem.length < state.pageSize
                ? listItem.length
                : state.pageSize
            }
            pages={totalPages}
            getPaginationProps={() => customProps}
            className="-striped -highlight"
          />
        </div>
      ) : (
        <div className="noRecordFound errormessage">
          <img
            className="errorimage"
            src={
              props.imageSrc ? props.imageSrc : "/assets/images/Error-icon.png"
            }
            alt="logo"
          />

          {props.noDataMsg && <h2 className="noDataYet">{props.noDataMsg}</h2>}

          {props.clickMsg && (
            <div className="clickOnButton">{props.clickMsg}</div>
          )}
          {!props.noDataMsg && !props.clickMsg && (
            <div className="clickOnButton">{t("noRecordsFound")}</div>
          )}
          <br />
          {props.buttonComponent}
        </div>
      )}
    </div>
  );
};

export default Datatable;
