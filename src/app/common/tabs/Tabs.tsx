import React from "react";
import Button from "./../button/Button";

export interface IProps {
  children?: string;
  label: string;
  active?: boolean;
  onClick?: any;
}

const Tabs = (props: IProps) => {
  const { label, active, onClick } = props;
  return (
    <Button
      type="info"
      className={active ? "active" : ""}
      onClick={onClick && !active ? () => onClick() : null}
    >
      {label}
    </Button>
  );
};

export default Tabs;
