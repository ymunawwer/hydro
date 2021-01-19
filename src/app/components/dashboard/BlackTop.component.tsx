import React, { useEffect, useState } from "react";
import './BlackTop.scss';


interface IProps {
  title  : string;
  //color  : string;
  className : string;
}

const BlackTop = (props:IProps) => {

  return (
 <div className={`blacktop ${props.className}`} >
        <div className="head"><p>{props.title}</p></div>
        <div className="inside_black"> 
         { /* <slot></slot> */}
         {props.children}
         </div>
      
    </div>
  )
};

export default BlackTop;
