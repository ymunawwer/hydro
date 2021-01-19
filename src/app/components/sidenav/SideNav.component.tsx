import React, { useEffect, useState } from "react";
import "./SideNav.scss";
import MenuBox from './MenuBox.component';

const SideNav = (props:any) => {



  let [menu,setMenu] = useState([
    {
      style: "box-menu",
      title: "username",
      image: "account_input.svg",
      unique: true,
      active: false,
      routeName: "user"
    },
    {
      style: "simple-menu",
      title: "Dash board",
      image: "list_dashboard.png",
      unique: false,
      active: true,
      routeName: "dashboard"
    },
    {
      style: "simple-menu",
      title: "meter reading",
      image: "meter_reading.png",
      unique: false,
      active: false,
      routeName: "meterReading"
    },
    {
      style: "simple-menu",
      title: "notifications",
      image: "eye.png",
      unique: false,
      active: false,
      routeName: "notifications"
    },
    {
      style: "simple-menu",
      title: "ticket status",
      image: "eye.png",
      unique: false,
      active: false,
      routeName: "ticketStatus"
    },
  ]);

  let makeActive = (index) => {
    for(let item of menu){
       item.active = false;
    }
    menu[index].active = true;
    setMenu([...menu]);
    console.log(props);
    props.history.push(`/${menu[index].routeName}`);

  }

  return (
    <div className="sidemenu">
      {
        menu.map((item, index) => {
          return (
            <MenuBox item={item} makeActive={makeActive} index={index} key={index}></MenuBox>
          )

        }) 

      }
    </div>
  )
};

export default SideNav;
