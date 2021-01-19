import React, { useEffect, useState } from "react";
import PointData from './PointData.component';

const NotificationCol = () => {

     let  data = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"]
  return (
    <div>
       {data.map((content,index) => {
        return <PointData index={index} content={content} key={index}></PointData>
         

})}
    </div>
  )
};

export default NotificationCol;
