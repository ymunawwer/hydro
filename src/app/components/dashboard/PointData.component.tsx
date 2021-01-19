import React, { useEffect, useState } from "react";
import './PointData.scss';


const PointData = ({index,content}) => {

  return (
  <>
  <tr className="table_row">
      <td className="index_number">
        <div className="text_wrapper">{index}</div>
      </td>
      <td className="side_data">{content}<br /><br />
      </td>
    </tr>
  </>
  )
};

export default PointData;
