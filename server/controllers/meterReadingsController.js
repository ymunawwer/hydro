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

 
   exports.getLast24HrsConsumption = async (req, res) => {
      
    let readings = await  meterReadingsService.getLast24HrsConsumption();
   
    res.json(readings);
     
   
   };



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

      
      exports.saveBkUp = async (req, res) => {
 
        let device = req.body;
        //const {fromDate,toDate,readingRange} = req.body;
         let status = await  meterReadingsService.saveBkUp();
        
         res.json(status);
         
     }
      
     exports.sendMail = async (req, res) => {
     
        //const {fromDate,toDate,readingRange} = req.body;
         let status = await  meterReadingsService.sendMail();
        
         res.json({success:true});
         
     }

//temp
exports.interpretMeterReadings = async (req, res) => {
     
    //const {fromDate,toDate,readingRange} = req.body;
     let status = await  meterReadingsService.interpretMeterReadings();
    
     res.json({success:true});

}


module.exports = exports;
