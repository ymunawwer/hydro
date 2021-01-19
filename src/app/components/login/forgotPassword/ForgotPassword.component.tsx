import { ErrorMessage, Field, Form, Formik } from "formik";
import isEmpty from "lodash.isempty";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { PrimaryButton, Styledlabel } from "../../../common/styled-components";
import { yupSchema } from "../../../utils/Yup.validation";
import { useTranslation } from "react-i18next";

export interface IProps {
  encodedUserName: string;
  getUserNameForgotPswd: (email: string) => void;
  message: string;
  loading: boolean;
}

const ForgotPassword = (props: IProps) => {
  const { t } = useTranslation();

  if (!isEmpty(props.encodedUserName)) {
    return <Redirect to={`/resetPassword/${props.encodedUserName}`} />;
  }
  return (
    <>
      <div className="forgotPanel loginWrapper">
        <div className="p-30 borderBottom">
          <h1 className="fs-25 twoStep text-center">{t("forgotPass")}</h1>
          <div className="py-2 mediumblueyGrey text-center">
            {t("accEverything")}.{" "}
            <span className="mediumSoftBlue Cursor">{t("learnMore")}</span>
          </div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={yupSchema.forgotPswdForm}
            onSubmit={(values: { email: string }, { setSubmitting }) => {
              props.getUserNameForgotPswd(values.email);
              setSubmitting(false);
            }}
            render={({ errors, touched }) => (
              <Form>
                <div className="formControl">
                  <Styledlabel htmlFor="email">{t("regEmail")}</Styledlabel>

                  <Field
                    name="email"
                    type="text"
                    autoComplete="off"
                    className={
                      errors && errors.email && touched && touched.email
                        ? "textBoxBorder formField"
                        : "formField"
                    }
                  />
                  <div className="errorMessage">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <PrimaryButton
                  className={`w-100 ${props.loading ? "loadBtn" : ""}`}
                  type="submit"
                >
                  {props.loading ? t("reseting") : t("reset")}
                </PrimaryButton>
                <div className="errorMessage">{props.message}</div>
              </Form>
            )}
          />
        </div>
        <div className="p-30">
          <div className="text-center mediumSoftBlue Cursor">
            <Link to="/forgotUserId" className="btn-link">
              {t("forgotUsername")}
            </Link>
          </div>
          <div className="text-center pt-2 greyMediumFont">
            {t("rememberPass")}{" "}
            <Link to="/login" className="mediumSoftBlue Cursor">
              {t("loginHere")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
