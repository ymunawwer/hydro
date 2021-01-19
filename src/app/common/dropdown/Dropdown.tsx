import React, { useState } from "react";
import "./dropdown.scss";
import "./dropdown-ar.scss";

export interface IProps {
  label: String;
  values: any[];
}

const Dropdown = (props: IProps) => {
  const [visibility, toggle] = useState(false);
  const { label, values } = props;
  return (
    <div className={`dropdown ${visibility ? "open" : ""}`}>
      <label className="mainSelection" onClick={() => toggle(!visibility)}>
        {label} <span className={`icon icon-down-arrow`}></span>
      </label>
      {visibility && values && values.length && (
        <ul className={`list collapsible`}>
          {values.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
