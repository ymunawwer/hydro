import * as Yup from "yup";

export const yupSchema = {
  Login: Yup.object({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  }),
  Search: Yup.object({
    search: Yup.string().required("Search cannot be empty"),
  }),
  TranslationForm: Yup.object({
    key: Yup.string().required("Key is required"),
    english: Yup.string().required("English is required"),
    arabic: Yup.string().required("Arabic is required"),
  }),
  GroupsForm: Yup.object({
    english: Yup.string().required("English is required"),
    arabic: Yup.string().required("Arabic is required"),
  }),
  ModulesForm: Yup.object({
    moduleName: Yup.string().required("Module name is required"),
  }),
  ErrorCodesForm: Yup.object({
    key: Yup.string().required("Key is required"),
    errorcode: Yup.string().required("Errorcode is required"),
    english: Yup.string().required("English is required"),
    arabic: Yup.string().required("Arabic is required"),
  }),
  BanksForm: Yup.object({
    bank: Yup.string().required("Bank Name is required"),
    url: Yup.string().required("Bank Url is required"),
    type: Yup.string().required("Bank type is required"),
    logo: Yup.mixed().required("Logo is required"),
  }),
  AllUserProfileForm: Yup.object({
    company: Yup.string().required("Company name is required"),
    noOfUsers: Yup.string().required("No. of users is required"),
    sPoc: Yup.string().required("SPoc is required"),
    email: Yup.string().required("Email address is required"),
    mobile: Yup.string().required("Mobile number is required"),
  }),
  userManagementForm: Yup.object({
    name: Yup.string().required("Name is required field"),
    email: Yup.string().required("Email is required field"),
    mobile: Yup.string().required("Mobile is required field"),
    roleId: Yup.string().required("Role is required field"),
    countryCode: Yup.string().required("Select the country code"),
  }),
  roleManagementForm: Yup.object({
    roleName: Yup.string().required("Role name is required field"),
  }),
  companyInfoForm: Yup.object({
    companyName: Yup.string()
      .min(3, "Company Name must be atleast 3 characters")
      .max(100)
      .required("Name is required"),
    companyNameAr: Yup.string()
      .min(3, "Company Name must be atleast 3 characters")
      .max(100)
      .matches("^[\u0621-\u064A\u0660-\u0669 0-9 ]+$", "only Arabic is allowed")
      .required("Arabic Name is required"),
    licenceTypeId: Yup.string().required("License Type is required"),
  }),
  signInSecurityForm: Yup.object({
    userId: Yup.string()
      .min(3, "User Id must be atleast 3 characters")
      .max(100)
      .required("User Id is required"),
    email: Yup.string()
      .required("Email is required ")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: "Please enter a valid Email.",
        excludeEmptyString: false,
      }),
    phone: Yup.string().matches(/\d{9}$/, {
      message: "Please enter a valid phone number.",
      excludeEmptyString: false,
    }),
  }),
  bankAccountsForm: Yup.object({
    bankId: Yup.string().required("Bank is required"),
    accountId: Yup.string()
      .min(3, "Account Id must be atleast 3 characters")
      .max(100)
      .required("User Id is required"),
    password: Yup.string().required("Password is required"),
  }),
};
