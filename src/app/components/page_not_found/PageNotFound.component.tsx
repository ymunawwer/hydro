import React from "react";

export const PageNotFound = () => {
  return (
    <div className="errorWhitePanel">
      <div className="container">
        <div className="errorBoundmessage">
          <img
            className="errorimage"
            src={"/assets/images/404_error.png"}
            alt="logo"
          />
          <h2 className="errorBoundMsgText">404 error</h2>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
