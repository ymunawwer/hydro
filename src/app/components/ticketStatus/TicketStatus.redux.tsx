import { connect } from "react-redux";
import { Dispatch } from "redux";
import TicketStatus from "./TicketStatus.component";
import { getTickets } from "./TicketStatus.action";

export const mapStateToProps = (state: any) => {
  return {
    //...state,
    tickets: state.tickets,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getTickets: () => dispatch(getTickets()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketStatus);
