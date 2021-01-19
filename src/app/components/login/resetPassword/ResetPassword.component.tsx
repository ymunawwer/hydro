import React, { useEffect } from "react";

import NewPassword from "./NewPassword.component";

import {
  IResetPasswordCallDdetails,
  IResetPswdState,
} from "./ResetPassword.actionTypes";
export interface IProps {
  email: string;
  phone: string;
  maskedEmail: string;
  maskedPhoneNumber: string;
  userId: string;
  continue: boolean;
  otpStatus: string;
  message: string;
  selectedOption: string;
  userName: string;
  showPwdScreen: boolean;
  verifyStatus: string;
  verifyMessage: string;
  fetchUserDetails: (encodedUserName: string) => void;
  resetPasswordCall: (
    iResetPasswordCallDdetails: IResetPasswordCallDdetails
  ) => void;
  encodedUserName: string;
  continueLoading: boolean;
}

const ResetPassword = (props: IProps) => {
  useEffect(() => {
    props.fetchUserDetails(props.match.params.encodedUserName);
  }, []);
      return (
        <div>
          <NewPassword
            encodedUserName={props.encodedUserName}
            resetPasswordCall={props.resetPasswordCall}
            showPwdScreen={props.showPwdScreen}
            verifyStatus={props.verifyStatus}
            verifyMessage={props.verifyMessage}
          />
        </div>
      );
};

export default ResetPassword;
