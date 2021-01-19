import {
  TicketStatusTypes,
} from "./TicketStatus.actionTypes";

export const getTickets = () => {
  return {
    type: TicketStatusTypes.GET_TICKETS,
  };
};

