import React, { useEffect } from "react";
import { Link, RouteChildrenProps } from "react-router-dom";
import { IUserDetails, IUserResponse } from "./Login.actionTypes";
import "./Login.scss";
import LoginCard from "./LoginCard.component";
import { IForgotUserIdResponse } from "./forgotUserId/ForgotUserId.actionTypes";
import isEmpty from "lodash.isempty";

export interface IProps {
  onLogin?: ((values: IUserDetails) => void) | undefined;
  user: IUserResponse;
  location: RouteChildrenProps;
  sessionTimout: boolean;
  twoStepVerification: boolean;
  email: string;
  phone: string;
  userId: string;
  continue: boolean;
  otpStatus: string;
  message: string;
  userName: string;
  maskedPhoneNumber: string;
  maskedEmail: string;
  loggedInUserId: any;
  loggedInCompany: any;
  selectedOption: string;
  resetSessionTimeout: () => void;
  accessToken?: string;
  forgotUserId: IForgotUserIdResponse;
  loading: boolean;
  auditData: any;
  continueLoading: boolean;
}

const Login = (props: IProps) => {
  let imageArray = [];
  



  
    return (
      <>
  <div className="login">
      <img className="wave_back"  src="/assets/images/group_bar.svg" alt="logo"  />
    <div className="head_bar">

    <div className="image_wrapper" >
          <img src="/assets/images/welcome/group_1.svg" alt="logo" />
      </div>
    <div className="image_wrapper" >
          <img src="/assets/images/welcome/group_2.svg" alt="logo" />
      </div>
    <div className="image_wrapper" >
          <img src="/assets/images/welcome/group_3.svg" alt="logo" />
      </div>
    <div className="image_wrapper" >
          <img src="/assets/images/welcome/group_4.svg" alt="logo" />
      </div>
    <div className="image_wrapper" >
          <img src="/assets/images/welcome/group_5.svg" alt="logo" />
      </div>
    </div>
    <img className="wallpaper" src="/assets/images/welcome_bg.png" alt="logo"/>
    <img className="side_logo" src="/assets/images/logo_shadow.png" alt="logo"/>
    { /*  <img class="side_logo" src="@/assets/logo_shadow.png" />
    { /*<loginCard class="login_card" /> */ }
      <LoginCard
        onLogin={props.onLogin}
        user={props.user}
        location={props.location}
        sessionTimout={props.sessionTimout}
        forgotUserId={props.forgotUserId}
        loggedInUserId={props.loggedInUserId}
        loggedInCompany={props.loggedInCompany}
        loginMessage={props.user.message}
      ></LoginCard>
  </div>
      
      </>
      
    );
    
  
};

export default Login;
