module.exports = {
  CONST_BUSINESS_TYPES: [
    { label: "Oil & Paints", value: "Oil & Paints" },
    { label: "Conglomerates", value: "Conglomerates" },
    { label: "Financials", value: "Financials" },
    { label: "Oil & Gas", value: "Oil & Gas" },
  ],

  CONST_ERP_TYPES: [
    { label: "Axapta", value: "Axapta" },
    { label: "SAP", value: "SAP" },
    {
      label: "Oracle Financials",
      value: "Oracle Financials",
    },
    {
      label: "Microsoft Dynamics",
      value: "Microsoft Dynamics",
    },
  ],
  APPROVAL_STATUS: {
    IN_PROGRESS: "In progress",
    APPROVED: "Approved",
    REVIEWED: "reviewed",
    EXECUTED: "Executed",
    REJECTED: "Rejected",
    MORE_INFO: "More info",
    MORE_INFO_BY_REVIEWER: "More info by reviewer",
    MORE_INFO_BY_APPROVER: "More info by Approver",
  },
  SUCCESS: "success",
  FAILED: "failed",
  ACCOUNT_TYPE: {
    OWNACC: "Own bank accounts",
    INTERBANK: "Inter bank transfers",
    SARIE: "Local transfers",
    SWIFT: "International transfers",
  },
  API_ERROR_EN: "OOPS!  Request Denied, Please try again",
  API_ERROR_AR: "OOPS!  Request Denied, Please try again",
  BANK_CODES:{
    SAMBA:"SAMBA",
    ALRAJHI:"ALRAJHI",
    BSF:"BSF",
    NCB:"NCB",
    SABB:"SABB"
  },
  PAYMENT_STATUS:{
    OPEN:"open",
    BANK_PROCESS:"bank process",
    FAILED:"failed",
    COMPLETED:"completed"
  },
  DEFAULT_CURRENCY:"SAR",
  PAYMENT_ENQUIRY_TYPE:{
    SINGLE:"SINGLEREQ",
    BULK:"BULKREQ"
  }
};
