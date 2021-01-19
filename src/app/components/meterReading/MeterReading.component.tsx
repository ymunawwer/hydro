import React from "react";
import ReactSpeedometer from "react-d3-speedometer"

const MeterReading = (props: IProps) => {


  return (
    <div >
      <ReactSpeedometer
  maxValue={10000}
  value={8000}
  needleColor="black"
  startColor="green"
  //segments={10}
  endColor="red"
  //segmentColors={["firebrick", "tomato", "gold", "limegreen"]}  
  //maxSegmentLabels={5}
  segments={1000}
  customSegmentStops={[0,2500 , 5000, 7500, 10000]}  
/>
    </div>
  )
};

export default MeterReading;
