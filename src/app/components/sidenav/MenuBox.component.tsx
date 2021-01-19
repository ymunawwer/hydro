import React, { useEffect, useState } from "react";
import "./MenuBox.scss";
import {
  IProps,
} from "./SideNav.actionTypes";

const MenuBox = (props: IProps) => {

  return (
    <>    
  <div className={`menu_box ${props.item.active?'active':''} ${props.item.unique?'unique':''}`}
            onClick={() => props.makeActive(props.index)}>
  <img className="logo_menu" src={`/assets/images/${props.item.image}`} alt=""/>
  <p>{props.item.title}</p>
</div>
</>
  )
};

export default MenuBox;
