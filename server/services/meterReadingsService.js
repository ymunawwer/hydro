const readingsModel = require("../models/readings");
const { base64decode } = require("nodejs-base64");


exports.getMeterReadings = async (user, expiresIn) => {

    let readings = await  readingsModel.find();

    let messages = readings.map((reading) => {
      //  return JSON.parse(reading.message);
      let message = JSON.parse(reading.message) ;
      let decodedPayload = base64decode(message.uplink_message.frm_payload);
        return {
            message,
            decodedPayload
        };
    })
    return messages;
};



exports.saveReading = async ({message}) => {

    let reading = {
        message
    }
    try {
        const readings = await new readingsModel(reading).save();

    }
        catch (err) {
            console.log("err occured in saveReading due to : " + err);
            
          }
   };