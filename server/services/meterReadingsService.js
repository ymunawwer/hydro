const readingsModel = require("../models/readings");

exports.getMeterReadings = async (user, expiresIn) => {
 return {};
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