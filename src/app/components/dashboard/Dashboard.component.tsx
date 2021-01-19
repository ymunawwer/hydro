import React, { useEffect, useState } from "react";
import './Dashboard.scss';
import BlackTop from './BlackTop.component';
import NotificationCol from './NotificationCol.component';
import ColorCards from './ColorCards.component';
import ApexChart from './ApexChart.component';

const Dashboard = () => {


  return (
    <>
    <div className="dashboard">
    <div className="first_row">
      <BlackTop className="graph_bt" title="Usage">
          <ApexChart />
      </BlackTop>
      { /* <BlackTop className="notification_bt" title="Notification" ><NotificationCol/></BlackTop> */}
    </div>
    { /* <p className="other_data_heading">Other Data Readings</p>
    <div className="row_elements">
      {
    [1,2,3,4].map((i) => {
      return <ColorCards color={i}  key={i}/>

    })

      }
    </div> */}
    <br/>
  </div>
  </>
  )
};

export default Dashboard;
