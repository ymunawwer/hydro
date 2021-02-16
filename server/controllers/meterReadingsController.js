const meterReadingsService = require("../services/meterReadingsService");
var mqtt=require('mqtt');

exports.getMeterReadings = async (req, res) => {

    const {fromDate,toDate,readingRange} = req.body;
    let readings = await  meterReadingsService.getMeterReadings({
        fromDate,toDate,readingRange
    });
   
    res.json(readings);
     
   
   };

   exports.getLatestMeterReading = async (req, res) => {

    //const {fromDate,toDate,readingRange} = req.body;
     let reading = await  meterReadingsService.getLatestMeterReading();
    
     res.json(reading);
     
 }

 exports.saveDevice = async (req, res) => {
 
    let device = req.body;
    //const {fromDate,toDate,readingRange} = req.body;
     let status = await  meterReadingsService.saveDevice({device});
    
     res.json(status);
     
 }

// temporary - 
exports.updateReadingsCollection = async (req, res) => {
   
    const {fromDate,toDate} = req.body;
    let readings = await  meterReadingsService.updateReadingsCollection();
   
    res.json(readings);
     
   
   };
   // temporary - 
      exports.getLatestDecodedPayloads = async (req, res) => {
      
       let readings = await  meterReadingsService.getLatestDecodedPayloads();
      
       res.json(readings);
        
      
      };


module.exports = exports;
