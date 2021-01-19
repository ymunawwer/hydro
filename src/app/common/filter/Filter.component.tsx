import React from "react";
import "./filter.scss";
import "./filter-ar.scss";
export interface IFilterData {
  _id: "";
  name: "";
}
export interface IProps {
  filteredData: any;
  groupName: string;
  valueToBeSearched: string;
  hideDropdown: (value: string, exist?: boolean) => void;
}

export interface IFilter {
  success: boolean;
  data: IData[];
}
export interface IData {
  _id: string;
  name: string;
}
const Filter = (props: IProps) => {
  return (
    <div>
      {props.filteredData && props.filteredData.length > 0 && (
        <ul className="filterList">
          {props.filteredData &&
            props.filteredData.map(
              (item: IData) =>
                item.name !== "" && (
                  <li
                    onClick={() => props.hideDropdown(item.name, true)}
                    key={item._id}
                  >
                    {item.name}
                  </li>
                )
            )}
          {props.filteredData &&
            props.filteredData.length > 0 &&
            props.filteredData[0].name !== "" && (
              <li
                className="addItem"
                onClick={() => props.hideDropdown(props.valueToBeSearched)}
              >
                Add {props.valueToBeSearched}
              </li>
            )}
          {/* {props.filteredData.length > 0 && (
        <div className="error">{props.groupName} group exists</div>
      )} */}
        </ul>
      )}
    </div>
  );
};

export default Filter;
