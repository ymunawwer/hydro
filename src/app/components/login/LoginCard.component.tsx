import React ,{useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { yupSchema } from "../../utils/Yup.validation";
import { Link, RouteChildrenProps } from "react-router-dom";
import { IUserDetails } from "./Login.actionTypes";
import { IUserResponse } from "../../commonTypes";
import "./LoginCard.scss";
import { PrimaryButton } from "../../common/styled-components";
import { toast, ToastContainer } from "react-toastify";
import { IForgotUserIdResponse } from "./forgotUserId/ForgotUserId.actionTypes";
import { useTranslation } from "react-i18next";

export interface IProps {
  onLogin?: ((values: IUserDetails) => void) | undefined;
  user: IUserResponse;
  location: RouteChildrenProps;
  sessionTimout: boolean;
  forgotUserId: IForgotUserIdResponse;
  loggedInUserId: any;
  loggedInCompany: any;
  loginMessage:string | undefined;
}

const LoginCard = (props: IProps) => {
  const query = new URLSearchParams(props.location.search);
  const message = query.get("message");
  
  useEffect(() => {
    
    props.loginMessage && toast.error(props.loginMessage);
  }, [props.loginMessage]);
  return (
    <div className="login-card">
    <div className="wallpaper"></div>
    <div className="head-login-card">HYDROID SMART WATER METER</div>
    <p className="head_text">Sign in to your account</p>
    
    <Formik
        initialValues={{
          userName: "",
          password: "",
          modulesCategory: [],
          source_type: "web",
          ipAddress: "",
        }}
        validationSchema={yupSchema.Login}
        onSubmit={(values: IUserDetails, { setSubmitting }) => {
          props.onLogin && props.onLogin(values);
          setSubmitting(false);
        }}
      >
        <Form>
  <div className="inputfield">
    <div className="icon_bg"><img src="/assets/images/account_input.svg" alt="username"/></div>
            <Field
              name="userName"
              className="inputele"
              type="text"
              autoComplete="off"
              placeholder="Username"
              // maxLength={50}
            />
            <div className="errorMessage">
              <ErrorMessage name="userName" />
            </div>
            </div>
    <br />
    
  <div className="inputfield">
    <div className="icon_bg"><img src="/assets/images/key.svg" alt="username"/></div>
            <Field
              name="password"
              className="inputele"
              type="password"
              placeholder="Password"
              // maxLength={20}
            />
            <div className="errorMessage">
              <ErrorMessage name="password" />
            </div>
          </div>
    <br />
    <button className="login_btn">Login</button>
        </Form>
  </Formik>
    <button className="signup_btn">Signup</button>
    <button className="forgot_btn">Forgot Password?</button>
      <ToastContainer
        className="toastContainer"
        toastClassName="toastBody"
        hideProgressBar={true}
        position="bottom-center"
      />
  </div>
  );
};

export default LoginCard;
