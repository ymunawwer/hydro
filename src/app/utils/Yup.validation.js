import * as Yup from "yup";

export const yupSchema = {
  Login: Yup.object({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  }),
  Search: Yup.object({
    search: Yup.string().required("Search cannot be empty"),
  }),
  AllUserProfileForm: Yup.object({
    company: Yup.string().required("Company name is required"),
    noOfUsers: Yup.string().required("No. of users is required"),
    sPoc: Yup.string().required("SPoc is required"),
    email: Yup.string().required("Email address is required"),
    mobile: Yup.string().required("Mobile number is required"),
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
};
