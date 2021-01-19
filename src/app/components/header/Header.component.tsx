import React, { useState, useEffect } from "react";
import './Header.scss';
import SearchBar from './SearchBar.component';
import ProfileButton  from './HeaderProButton.component';

export interface IProps {
  handleLogout: () => void;
}

export const Header = (props: IProps) => {



  return ( 
    <>
  <div className="header_hydroid">
  <img className="logo" src="/assets/images/menu_logo_shadow.png" alt=""/>
  <ProfileButton handleLogout={props.handleLogout}></ProfileButton>
  <img className="notifications" src="/assets/images/bell.svg" alt=""/>
  { /* <SearchBar ></SearchBar>
 
  <button @click="logout()" class="logout">Logout</button> --> */}
</div>
</>
);
};

export default Header;
