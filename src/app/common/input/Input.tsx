import React from "react";
import "./input.scss";
import "./input-ar.scss";

export interface IProps {
  type?: string;
  className?: string;
  onChange?: any;
  checked?: boolean;
  disabled?: boolean;
}

const Input = (props: IProps) => {
  const { type, onChange, checked, disabled } = props;
  return (
    <input
      id="c1"
      type={type}
      onChange={onChange ? onChange : null}
      checked={checked ? checked : false}
      disabled={disabled}
    />
  );
};
export default Input;
