import {
  TicketStatusActionTypes,
} from "./TicketStatus.actionTypes";

export const login_reducer = (
  state: any = {},
  action: any
) => {
  switch (action.type) {
    case TicketStatusActionTypes.GET_TICKETS:
      return {
        // ...state,
        loading: true,
      };
    case TicketStatusActionTypes.GET_TICKETS_SUCCEEDED:
      return {
        loading: false,
        tickets:action.tickets,
      };

    case TicketStatusActionTypes.GET_TICKETS_FAILED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};


