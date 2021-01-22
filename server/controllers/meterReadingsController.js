const meterReadingsService = require("../services/meterReadingsService");
var mqtt=require('mqtt');

exports.getMeterReadings = async (req, res) => {


 let readings = await  meterReadingsService.getMeterReadings();

 res.json(readings);
  

};

module.exports = exports;
