import React, { useEffect, useState } from "react";
import './ColorCards.scss';

const ColorCards = ({color}) => {

  let colorChoose = (key:number) => {
    switch (key) {
      case 1:
        return "orange";
      case 2:
        return "blue";
      case 3:
        return "green";
      default:
        return "brown";
    }
  }
  
  return (
    <div className= {`${colorChoose(color)} color-cards`} >
    <p className="color_heading">Heading</p>
  </div>
  )
};

export default ColorCards;
