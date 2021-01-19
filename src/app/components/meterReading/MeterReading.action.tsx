import {
  MeterReadingActionTypes,
} from "./MeterReading.actionTypes";

export const getMeterReadings = () => {
  return {
    type: MeterReadingActionTypes.GET_METER_READING,
  };
};

