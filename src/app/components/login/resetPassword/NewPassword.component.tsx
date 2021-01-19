import React, { useEffect, RefObject } from "react";
import {
  IResetPasswordCallDdetails,
  IResetPswdForm,
  IResetPswdState,
  defaultResetPswdValues,
} from "./ResetPassword.actionTypes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../../utils/Yup.validation";
import { Styledlabel, PrimaryButton } from "../../../common/styled-components";

export interface IProps {
  resetPasswordCall: (
    ichangePasswordCallDdetails: IResetPasswordCallDdetails
  ) => void;
  showPwdScreen: boolean;
  verifyStatus: string;
  verifyMessage: string;
  encodedUserName: string;
}

const ResetPassword = (props: IProps) => {
  if (props.showPwdScreen === false) {
    // const encodedUserName = props.match.params.encodedUserName;
    const encodedUserName = props.encodedUserName;
    return (
      <div className="panel loginWrapper">
        <h1 className="fs-25 twoStep mb-2 text-center">Reset Password</h1>
        <Formik
          initialValues={defaultResetPswdValues}
          //enableReinitialize
          validationSchema={yupSchema.resetPswdForm}
          onSubmit={(values: IResetPswdForm, { setSubmitting }) => {
            props.resetPasswordCall({
              encodedUserName: encodedUserName,
              newPassword: values.newPassword,
              // currentPassword: values.currentPassword,
            });
            setSubmitting(false);
          }}
          render={({ errors, touched }) => (
            <Form>
              <div className="formControl">
                <Styledlabel htmlFor="newPassword">New Password</Styledlabel>

                <Field
                  name="newPassword"
                  type="password"
                  autoComplete="off"
                  className={
                    errors &&
                    errors.newPassword &&
                    touched &&
                    touched.newPassword
                      ? "textBoxBorder formField"
                      : "formField"
                  }
                />
                <div className="errorMessage">
                  <ErrorMessage name="newPassword" />
                </div>
              </div>
              <div className="formControl">
                <Styledlabel htmlFor="confirmPassword">
                  Confirm Password
                </Styledlabel>

                <Field
                  name="confirmPassword"
                  type="password"
                  autoComplete="off"
                  className={
                    errors &&
                    errors.confirmPassword &&
                    touched &&
                    touched.confirmPassword
                      ? "textBoxBorder formField"
                      : "formField"
                  }
                />
                <div className="errorMessage">
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>
              <PrimaryButton className="w-100" type="submit">
                Change
              </PrimaryButton>
              <div className="errorMessage">
                {/* <ErrorMessage name="confirmPassword" /> */}
                {props.verifyMessage}
              </div>
            </Form>
          )}
        />
      </div>
    );
  } else {
    return (
      <div className="panel loginWrapper">
        {/*  {props.verifyStatus === "success" && ( */}
        <>
          {/* <div className="formControl">{props.verifyMessage}</div> */}
          <div className="formControl">
            Your Password is reset successfully. Please
            <a href="/login"> login</a> again
          </div>
        </>
        {/* )}  */}
        {/* {props.verifyStatus === "failed" && (
          <>
            <div className="formControl">
              Password Reset Failed due to {props.verifyMessage}, Please try
              again.
            </div>
          </>
        )} */}
      </div>
    );
  }
};

export default ResetPassword;
