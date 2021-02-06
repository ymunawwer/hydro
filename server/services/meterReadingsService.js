const readingsModel = require("../models/readings");
const { base64decode } = require("nodejs-base64");
const moment = require('moment');

exports.getMeterReadings = async (user, expiresIn) => {

    let readings = await  readingsModel.find();

    let messages = readings.map((reading) => {
      //  return JSON.parse(reading.message);
      let message = JSON.parse(reading.message) ;
      let decodedPayload = "",totalReading=0, date;
      if(message.uplink_message){
        decodedPayload = base64decode(message.uplink_message.frm_payload);
        let readings = decodedPayload.split("_");
        let timeDiff  = 12/(readings.length -1 );
        totalReading  = readings.reduce((total,sum ) => parseInt(total) + (parseInt(sum) * 10) ,0);
        date = message.uplink_message.rx_metadata[0].time;
      }
        return {
            //message,
            //decodedPayload,
            totalReading,
            date
        };
    });
    var totalReadings = {};

    for(let message of messages){
        let day = moment(message.date).format("DD-MM-YYYY");
        if(totalReadings[day]){
            totalReadings[day] += message.totalReading;
        }else{
            totalReadings[day] = message.totalReading;
        }
    }

    return totalReadings;
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