import { put, takeLatest, call } from "redux-saga/effects";
import { MeterReadingActionTypes } from "./MeterReading.actionTypes";
import api from "../../api.json";
import endpoint from "../../apiUtil";

export function* getMeterReadings(req) {
  try {
    let res = null;

      res = yield call(endpoint.get, api.getMeterReadings);
    if (res.data.success) {
           
        yield put({ type: MeterReadingActionTypes.GET_METER_READING_SUCCEEDED, readings: res.data.readings });
      
    } else {
      yield put({ type: MeterReadingActionTypes.GET_METER_READING_FAILED});
    }
  } catch (err) {
    yield put({
      type: MeterReadingActionTypes.GET_METER_READING_FAILED,
    });
  }
}


export function* loginUserWatcher() {
  yield takeLatest(MeterReadingActionTypes.GET_METER_READING, getMeterReadings);
}


