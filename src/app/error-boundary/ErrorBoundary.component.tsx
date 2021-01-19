import React from "react";
import endpoint from "../apiUtil";
import api from "../api.json";
import { getAuditData } from "../utils/roleHelper";
import "./ErrorBoundary.scss";
import "./ErrorBoundary-ar.scss";

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    const data: any = {
      ...getAuditData(),
      errorMessage: error.message,
      errorStack: error.stack,
      errorType: error.name,
      errorSource: "Web",
    };
    endpoint.post(api.appLogs, data);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="errorWhitePanel">
          <div className="container">
            <div className="errorBoundmessage">
              <img
                className="errorimage"
                src={"/assets/images/error_boundary_icon.png"}
                alt="logo"
              />
              <h2 className="errorBoundMsgText">
                The page you’re looking for can’t be found
              </h2>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
