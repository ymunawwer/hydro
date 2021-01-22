const readingsModel = require("../models/readings");

exports.getMeterReadings = async (user, expiresIn) => {

    let readings = await  readingsModel.find();

    let messages = readings.map((reading) => {
        return JSON.parse(reading.message);
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
            console.log("err occured in saveBeneficiaries due to : " + err);
            
          }
   };