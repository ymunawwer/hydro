import {
  MeterReadingActionTypes,
} from "./MeterReading.actionTypes";

export const login_reducer = (
  state: any = {},
  action: any
) => {
  switch (action.type) {
    case MeterReadingActionTypes.GET_METER_READING:
      return {
        // ...state,
        loading: true,
      };
    case MeterReadingActionTypes.GET_METER_READING_SUCCEEDED:
      return {
        loading: false,
        readings:action.readings,
      };

    case MeterReadingActionTypes.GET_METER_READING_FAILED: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};


