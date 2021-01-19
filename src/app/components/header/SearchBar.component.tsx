import React, { useEffect, useState } from "react";
import './SearchBar.scss';

const SearchBar = () => {


  return (
    <>
    <form action="" className="search-bar">
	<input type="search" name="search" autoComplete="off" pattern=".*\S.*" required ></input>
	<button className="search-btn" type="submit">
		<span>Search</span>
	</button>
    </form>
  </>
  )
};

export default SearchBar;
