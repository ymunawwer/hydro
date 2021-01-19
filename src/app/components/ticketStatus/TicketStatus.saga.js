import { put, takeLatest, call } from "redux-saga/effects";
import { TicketStatusActionTypes } from "./TicketStatus.actionTypes";
import api from "../../api.json";
import endpoint from "../../apiUtil";

export function* getReqTickets(req) {
  try {
    let res = null;

      res = yield call(endpoint.get, api.getReqTickets);
    if (res.data.success) {
           
        yield put({ type: TicketStatusActionTypes.GET_TICKETS_SUCCEEDED, tickets: res.data.tickets });
      
    } else {
      yield put({ type: TicketStatusActionTypes.GET_TICKETS_FAILED});
    }
  } catch (err) {
    yield put({
      type: TicketStatusActionTypes.GET_TICKETS_FAILED,
    });
  }
}


export function* loginUserWatcher() {
  yield takeLatest(TicketStatusActionTypes.GET_TICKETS, getReqTickets);
}


