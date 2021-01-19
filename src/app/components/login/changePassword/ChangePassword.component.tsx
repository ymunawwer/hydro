import React, { useEffect, RefObject } from "react";
import {
  IchangePasswordCallDdetails,
  IChangePswdForm,
  IChangePswdState,
  defaultChangePswdValues,
} from "./changePassword.actionTypes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../../utils/Yup.validation";
import { Styledlabel, PrimaryButton } from "../../../common/styled-components";

export interface IProps {
  changePasswordCall: (
    ichangePasswordCallDdetails: IchangePasswordCallDdetails
  ) => void;
  location?: any;
  showPwdScreen: boolean;
  changePwdState: IChangePswdState;
}

const ChangePassword = (props: IProps) => {
  if (props.showPwdScreen === false) {
    // const encodedUserName = query.get("token");
    const encodedUserName = props.match.params.encodedUserName;
    return (
      <div className="panel loginWrapper">
        <div className="borderBottom mb-2">
          <h1 className="fs-25 twoStep text-center">Create New Password</h1>
          <div className="py-2 mediumblueyGrey text-center">
            One account for everything.{" "}Free access 60 days{" "}
            <span className="mediumSoftBlue Cursor">Learn more</span>
          </div>
        </div>
        <Formik
          initialValues={defaultChangePswdValues}
          //enableReinitialize
          validationSchema={yupSchema.changePswdForm}
          onSubmit={(values: IChangePswdForm, { setSubmitting }) => {
            props.changePasswordCall({
              encodedUserName: encodedUserName,
              newPassword: values.newPassword,
              currentPassword: values.currentPassword,
            });
            setSubmitting(false);
          }}
          render={({ errors, touched }) => (
            <Form>
              <div className="formControl">
                <Styledlabel htmlFor="currentPassword">
                  Current Password
                </Styledlabel>

                <Field
                  name="currentPassword"
                  type="password"
                  autoComplete="off"
                  className={
                    errors &&
                    errors.currentPassword &&
                    touched &&
                    touched.currentPassword
                      ? "textBoxBorder formField"
                      : "formField"
                  }
                />
                <div className="errorMessage">
                  <ErrorMessage name="currentPassword" />
                </div>
              </div>
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
            </Form>
          )}
        />
      </div>
    );
  } else {
    return (
      <div className="panel loginWrapper">
         <div>
          <h1 className="fs-25 twoStep text-center">Create New Password</h1>
          <div className="py-2 mediumblueyGrey text-center">
            One account for everything.{" "}Free access 60 days{" "}
            <span className="mediumSoftBlue Cursor">Learn more</span>
          </div>
        </div>
        {props.changePwdState.status === "success" && (
          <>
            <div className="formControl">{props.changePwdState.message}</div>
            <div className="formControl">
              Please
              <a href="/login" className="loginLink">
                {" "}
                login
              </a>{" "}
              again
            </div>
          </>
        )}

        {props.changePwdState.status === "failed" && (
          <>
            <div className="formControl">
              Password Change Failed due to {props.changePwdState.message},
              <a
                href="javascript:void(0)"
                onClick={() => window.location.reload(false)}
              >
                Please try again.
              </a>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default ChangePassword;
