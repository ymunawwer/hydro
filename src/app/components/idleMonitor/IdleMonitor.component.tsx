import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { isSuperAdmin } from "../../utils/roleHelper";
import IdleTimer from "react-idle-timer";
import "./IdleMonitor.scss";
import "./IdleMonitor-ar.scss";
import IdleDialog from "./IdleDialog";
import { logout, sessionTimeout } from "../header/Header.action";

export interface IProps {
  handleLogout: () => void;
  sessionTimeout: () => void;
}
export const IdleMonitor = (props: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const idleTimer = useRef<any | null>(null);

  const onAction = () => {
    setIsTimedOut(false);
  };
  const onActive = () => {
    setIsTimedOut(false);
  };
  const onIdle = () => {
    if (isTimedOut) {
      // handleLogout();
    } else {
      setShowModal(true);
      idleTimer.current.reset();
      setIsTimedOut(true);
    }
  };

  return (
    <div>
      <IdleTimer
        ref={(ref) => (idleTimer.current = ref)}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={40000}
        timeout={isSuperAdmin() ? 1000 * 60 * 15 : 1000 * 60 * 10}
      />
      {showModal && (
        <>
          <IdleDialog
            showModal={showModal}
            setShowModal={setShowModal}
            handleLogout={() => props.handleLogout()}
            sessionTimeout={props.sessionTimeout}
          />
        </>
      )}
    </div>
  );
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleLogout: () => {
      dispatch(logout());
    },
    sessionTimeout: () => {
      dispatch(logout());
      dispatch(sessionTimeout());
    },
  };
};

export default connect(null, mapDispatchToProps)(IdleMonitor);
