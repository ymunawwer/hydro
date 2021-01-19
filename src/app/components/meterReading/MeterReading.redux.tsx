import { connect } from "react-redux";
import { Dispatch } from "redux";
import TicketStatus from "./TicketStatus.component";
import { getMeterReadings } from "./MeterReading.action";

export const mapStateToProps = (state: any) => {
  return {
    //...state,
    readings: state.readings,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getMeterReadings: () => dispatch(getMeterReadings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketStatus);
