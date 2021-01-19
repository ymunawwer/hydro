import React from "react";
import "./button.scss";
import "./button-ar.scss";

export interface IProps {
  icon?: string;
  className?: string;
  children: string;
  onClick?: any;
  type?: string;
}

const Button = (props: IProps) => {
  const { icon, className, children, onClick, type } = props;
  const classCondition = className ? "btn" + " " + className : "btn";
  const typeStyle =
    type && type === "primary"
      ? "primary"
      : type === "success"
      ? "success"
      : type === "warning"
      ? "warning"
      : type === "info"
      ? "info"
      : type === "secondary"
      ? "secondary"
      : "";
  return (
    <button
      className={classCondition + " " + typeStyle}
      onClick={() => onClick && onClick()}
    >
      {icon && <i className={icon}></i>}
      {children}
    </button>
  );
};

// small
// medium
// large
export default Button;
