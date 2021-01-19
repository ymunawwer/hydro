import React, { useEffect } from "react";
import Button from "../../../common/button/Button";
import { useTranslation } from "react-i18next";
import {
  ViewApproval,
  IProps,
  commentsData,
} from "../Beneficiaries.actionTypes";
const moment = require("moment");
const ViewMore = (props: IProps) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="transactionDetails">
      <h3>
        {t("beneficiaryDetails")}
        <span
          className="icon icon-Close-outline-button Cursor"
          onClick={() => props.hideViewInfo()}
        ></span>
      </h3>

      <div className="company">
        <span>{props.ViewMoreData && props.ViewMoreData.beneficiary_name}</span>
        <span className="amount">{props.ViewMoreData.account_number}</span>
        {props.ViewMoreData.bankName}
        {/* <span>{moment(paymentData.createdDate).format("DD/MM/YYYY")}</span> */}
      </div>
      <div className="mainDetails overflow-auto">
        <div className="detailsRow">
          <span>{t("nickName")}</span>
          <span>{props.ViewMoreData.nick_name}</span>
        </div>
        <div className="detailsRow">
          <span>{t("iBan")}:</span>
          <span>{props.ViewMoreData.ifscCode}</span>
        </div>
        <div className="detailsRow">
          <span>{t("beneficiaryAddress")}</span>
          <span>{props.ViewMoreData.address}</span>
        </div>
        <div className="detailsRow">
          <span>{t("desc")}</span>
          <span>{props.ViewMoreData.description}</span>
        </div>
        <div className="detailsRow">
          <span>{t("initiatedBy")}</span>
          <span>{props.ViewMoreData.createdBy}</span>
        </div>

        <div className="detailsRow">
          <span>{t("status")}</span>
          <span>
            {props.ViewMoreData.approval_status === "Executed" &&
              t("benStatusCom")}
            {props.ViewMoreData.approval_status === "In progress" &&
              t("benStatProg")}
            {props.ViewMoreData.approval_status === "reviewed" &&
              t("benStatRev")}
            {props.ViewMoreData.approval_status === "Rejected" &&
              t("benStatusRej")}
            {(props.ViewMoreData.approval_status === "More info" ||
              props.ViewMoreData.approval_status === "More info by reviewer" ||
              props.ViewMoreData.approval_status === "More info by Approver") &&
              t("benStatMor")}
            {props.ViewMoreData.approval_status === "Approved" &&
              t("banStatApp")}
          </span>
        </div>
        <div className="approval mainPreApproval">
          {props.ViewMoreData &&
            props.ViewMoreData.timeLine &&
            props.ViewMoreData.timeLine.approval.map(
              (approval: ViewApproval, index: number) => {
                return (
                  <div className="subapproval" key={index}>
                    <span>
                      {approval.role === "reviewer" && "Review"}
                      {approval.role === "approver" && "Approve"}
                      {approval.role === "executor" && "Execute"}
                    </span>
                    <span
                      className={
                        approval.status
                          ? "icon-Green-check-mark approvalIcon"
                          : "subapprovalText approvalIcon noIcon"
                      }
                    >
                      <span>{!approval.status && "L" + (index + 1)}</span>
                    </span>
                    {approval.users.map((user: string) => {
                      return <span className="subapprovalText">{user}</span>;
                    })}
                    {approval.approverComments.map(
                      (comments: any, index2: number) => {
                        return (
                          <div key={index2}>
                            <span>
                              {moment(comments.commentDate).format(
                                i18n.language === "en"
                                  ? "DD/MM/YYYY"
                                  : "YYYY/MM/DD"
                              )}
                            </span>
                            <span>{comments.comment}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              }
            )}
        </div>
      </div>
      <div className="paymentStatus">
        {props.approvalRequest &&
          props.approvalRequest.original &&
          props.ViewMoreData &&
          props.ViewMoreData.showApprover && (
            <div className="paymentButtons">
              <div className="paymentButtons">
                <Button
                  icon="icon-info-circle"
                  type="primary"
                  onClick={() => props.hideNeedInfo()}
                >
                  {t("needMoreInfo")}
                </Button>
                <Button
                  icon="icon-close-circle"
                  type="warning"
                  onClick={() => props.hideRejectInfo()}
                >
                  {t("reject")}
                </Button>
                <Button
                  icon="icon-check-circle"
                  type="success"
                  onClick={() => props.hideApprove()}
                >
                  {t("approve")}
                </Button>
              </div>
            </div>
          )}

        {props.approvalRequest &&
          props.approvalRequest.original &&
          props.ViewMoreData &&
          props.ViewMoreData.showMoreInfo && (
            <div className="paymentButtons">
              <div className="paymentButtons">
                <Button
                  icon="icon-check-circle"
                  type="success"
                  onClick={() => props.hideSubmitInfo()}
                >
                  Submit more info
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ViewMore;
