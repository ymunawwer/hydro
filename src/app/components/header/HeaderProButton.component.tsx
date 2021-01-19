import React, { useEffect, useState } from "react";
import './HeaderProButton.scss';

const HeaderProButton = ({handleLogout}) => {

let [show,setShow] = useState(false);

  return (
    <>
    <div className="pro_button profile_btn" tab-index="1" onBlur={() => setShow(false)}>
        <img  onClick={() => setShow(!show)} className="person" src="/assets/images/person.svg" alt=""/>
        <p onClick={() => setShow(!show)} className="username">Username</p>
        {show && <div className="expansion">
           {/* <p>Profile detail 1</p>
            <p @click="logout()">Logout</p> */} 
           <p onClick={handleLogout}>Logout</p> 
          </div>
          }

    </div>
  </>
  )
};

export default HeaderProButton;
