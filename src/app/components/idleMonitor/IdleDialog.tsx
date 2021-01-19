import React, { useState, useEffect } from "react";
//import axios from "axios";
import Popup from "reactjs-popup";
//import * as Cookies from "js-cookie";
//import api from "../../api.json";
import "./IdleMonitor.scss";
import "./IdleMonitor-ar.scss";
//import history from "../../history";
import Button from "../../common/button/Button";
import { useTranslation } from "react-i18next";

export const IdleDialog = (props: any) => {
  const [timeToLive, setTimeToLive] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const { t } = useTranslation();

  const incrementValue = () => {
    setTimeToLive(timeToLive - 1);
    if (timeToLive === 1) {
      // handleLogout();
      //props.handleLogout();
      props.sessionTimeout();
    }
    if (timeToLive === 0) {
      clearInterval(timeToLive);
      setIsActive(false);
      props.sessionTimeout();
    }
  };
  // const handleLogout = () => {
  //   axios
  //     .get(api.logOutApi)
  //     .then((res) => {
  //       Cookies.remove("user");
  //       if (res.data.success) {
  //         return history.push("/login?message=sessionTimout");
  //       }
  //       return history.push("/login?message=sessionTimout");
  //     })
  //     .catch((error) => {});
  // };
  const handleClose = () => {
    props.setShowModal(false);
  };
  useEffect(() => {
    const interval = setInterval(incrementValue, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeToLive]);
  return (
    <div>
      <Popup
        open={props.showModal}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 426 }}
      >
        <div className="sessionWarning custom-ui">
          <div className="transactionDetails">
            <h3>
              {t("sessionExpWarn")}
              <span
                className="icon icon-Close-outline-button Cursor"
                onClick={() => handleClose()}
              ></span>
            </h3>
            <p className="t-color2 mb-15">
              {t("yrSessionExp")}
              {isActive && <span> {timeToLive} </span>}
              {!isActive && <span> 0 </span>} {t("paySec")}.
              {t("doYouWantExtend")}
            </p>

            <div className="sessionBtns">
              <Button
                className="transparent"
                onClick={() => props.handleLogout()}
              >
                {t("logout")}
              </Button>
              <Button className="secondary" onClick={() => handleClose()}>
                {t("yes")}
              </Button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default IdleDialog;
