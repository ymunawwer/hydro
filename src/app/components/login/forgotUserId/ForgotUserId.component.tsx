import { ErrorMessage, Field, Form, Formik } from "formik";
// import isEmpty from "lodash.isempty";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton, Styledlabel } from "../../../common/styled-components";
import { yupSchema } from "../../../utils/Yup.validation";
import {
  IForgotUserIdResponse,
  IForgotUserIdRequest,
} from "./ForgotUserId.actionTypes";
import history from "../../../history";
import { useTranslation } from "react-i18next";

export interface IProps {
  getUserNameForgotUserId: (data: IForgotUserIdRequest) => void;
  forgotUserIdResponse: IForgotUserIdResponse;
  message: string;
  loading: boolean;
}

const ForgotUserId = (props: IProps) => {
  const { t, i18n } = useTranslation();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (
      props.forgotUserIdResponse &&
      props.forgotUserIdResponse.status &&
      flag
    ) {
      history.push("/login");
      setFlag(false);
    }
  }, [props.forgotUserIdResponse]);

  return (
    <>
      <div className="forgotPanel loginWrapper">
        <div className="p-30 borderBottom">
          <h1 className="fs-25 twoStep text-center">{t("fgUsername")}</h1>
          <div className="py-2 mediumblueyGrey text-center">
            {t("accEverything")}.{" "}
            <span className="mediumSoftBlue Cursor">{t("learnMore")}</span>
          </div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={yupSchema.forgotPswdForm}
            onSubmit={(values: { email: string }, { setSubmitting }) => {
              props.getUserNameForgotUserId({
                email: values.email,
                lang: i18n.language,
              });
              setSubmitting(false);
              setFlag(true);
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
                  {props.loading ? t("sending") : t("send")}
                </PrimaryButton>
                <div className="errorMessage">{props.message}</div>
              </Form>
            )}
          />
        </div>
        <div className="p-30">
          <div className="text-center mediumSoftBlue Cursor">
            <Link to="/forgotPassword" className="btn-link">
              {t("forgotMyPass")}
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

export default ForgotUserId;
