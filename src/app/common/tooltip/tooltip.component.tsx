import React from "react";
import "./tooltip.scss";
import "./tooltip-ar.scss";

export interface IToolTipProps {
  title?: string;
  header?: string;
  content?: JSX.Element[] | JSX.Element;
  transactions?: string;
  anyFunc?: any;
  jsx?: boolean;
}

export const Tooltip = (props: IToolTipProps) => {
  // Testing and Designing Tooltip globally,
  const { title, header, content, anyFunc } = props;
  //if (props.transactions) {

  //return (
  //     <div className="transcationTooltip">
  //       <div className="bottom">
  //         <ul>
  //           <li onClick={() => anyFunc(true)}>
  //             <span className="icon-check-circle green"></span>Approve
  //           </li>
  //           <li>
  //             <span className="icon-close-circle red"></span>Reject
  //           </li>
  //           <li>
  //             <span className="icon-info-circle info"></span>need more info
  //           </li>
  //           <li>
  //             <span className="icon-view-more"></span>View More
  //           </li>
  //           <li>
  //             <span className="icon-share-circle iconRadius"></span>Share
  //           </li>
  //           <li>
  //             <span className="icon-Edit info"></span>Edit
  //           </li>
  //           <li>
  //             <span className="icon-Disabled red"></span>Stop payment
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // } else {
  if (props.jsx) {
    return <div>{content}</div>;
  } else {
    return (
      <div className="tooltip">
        <div className="tooltipTitle">{title}</div>
        {/* <div className="tooltipContent">
          <div className="tooltipHeader">{header}</div>
          <div className="tooltipBody">{content}</div>
        </div> */}
        <div className="transcationTooltip">
          <div className="bottom">
            <div className="tooltipHeader">{header}</div>
            <div className="tooltipBody">{content}</div>
          </div>
        </div>
      </div>
    );
  }
  //}
};
