const readingsModel = require("../models/readings");
const { base64decode } = require("nodejs-base64");
const moment = require('moment');

exports.getMeterReadings = async ({ fromDate,toDate,readingRange}) => {

    let formattedFromDate = moment(fromDate,"DD/MM/YYYY").toDate();
    let formattedToDate = moment(toDate,"DD/MM/YYYY").toDate();
    let readings;
    if(["weekly","monthly"].indexOf(readingRange) > -1){
        readings = await  readingsModel.find();

    }else{
        readings = await  readingsModel.find(
            {
                 receivedAt: {
                      $gte:formattedFromDate,
                       $lte:formattedToDate
                     }
            } );

    }
   // let readings = await  readingsModel.find({ receivedAt: { $gte:new Date(fromDate), $lte: new Date(toDate) } });
    //let readings = await  readingsModel.find();

    let messages = readings.map((reading) => {
      //  return JSON.parse(reading.message);
      let message = JSON.parse(reading.message) ;
      let decodedPayload = "",totalReading=0, date;
      if(message.uplink_message){
        decodedPayload = base64decode(message.uplink_message.frm_payload);
        let readings = decodedPayload.split("_");
         readings = readings.slice(0,6); // only first 6 values are readings
         let timeDiff  = 12/(readings.length -1 );
        totalReading  = readings.reduce((total,sum ) => parseInt(total) + (parseInt(sum) * 10) ,0);
        //date = message.uplink_message.rx_metadata[0].time;
        date = message.received_at;
      }
        return {
            //message,
            //decodedPayload,
            totalReading,
            date
        };
    });
    var dailyReadings = {},weeklyReadings={},monthlyReadings={};

    for(let message of messages){

        if(readingRange === "weekly"){
            let week = moment(message.date).week();

            if(dailyReadings[week]){
                weeklyReadings[week] += message.totalReading;
            }else{
                weeklyReadings[week] = message.totalReading;
            }
        }else if(readingRange === "monthly"){
            let month = moment(message.date).format("MMM");
             if(monthlyReadings[month]){
                monthlyReadings[month] += message.totalReading;
            }else{
                monthlyReadings[month] = message.totalReading;
            }
        }else{
            let day = moment(message.date).format("DD-MM-YYYY");
             if(dailyReadings[day]){
                dailyReadings[day] += message.totalReading;
            }else{
                dailyReadings[day] = message.totalReading;
            }
        }
    }

    let meterReadings=[];

    if(readingRange === "weekly"){
        for(let week in weeklyReadings){

            let meterReading  = {
                week,
                weeklyReading:weeklyReadings[week]
            }
            meterReadings.push(meterReading);
       }
    }else if(readingRange === "monthly"){
        for(let month in monthlyReadings){

            let meterReading  = {
                month,
                monthlyReading:monthlyReadings[month]
            }
            meterReadings.push(meterReading);
       }
    }else{
        for(let date in dailyReadings){
    
            let meterReading  = {
                date,
                dailyReading:dailyReadings[date]
            }
            meterReadings.push(meterReading);
        }

    }    

    return meterReadings;
};


exports.getLatestMeterReading = async () => {

    let latestReading = await  readingsModel.findOne().sort({receivedAt: -1});

    let message = JSON.parse(latestReading.message) ;
      let decodedPayload = "",totalReading=0, date;
      if(message.uplink_message){
        decodedPayload = base64decode(message.uplink_message.frm_payload);
        let readings = decodedPayload.split("_");
         readings = readings.slice(0,6); // only first 6 values are readings
        let timeDiff  = 12/(readings.length -1 );
        totalReading  = readings.reduce((total,sum ) => parseInt(total) + (parseInt(sum) * 10) ,0);
        //date = message.uplink_message.rx_metadata[0].time;
        date = message.received_at;
      }



    //return totalReading;
    return {
        date,
        totalReading
    };

}

exports.saveReading = async ({message}) => {

    let reading = {
        message,
        receivedAt:new Date(moment(message.received_at).format("DD-MM-YYYY"))
    }
    try {
        const readings = await new readingsModel(reading).save();

    }
        catch (err) {
            console.log("err occured in saveReading due to : " + err);
            
          }
   };

   exports.updateReadingsCollection = async () => {
   
      
       try {
    let readings = await  readingsModel.find();
    
        for(let reading of readings){
            console.log(reading);
            let message  = JSON.parse(reading.message);
            reading.received_at = message.received_at;
         //  let  rdng  =  await reading.save();
           let  rdng  =  await readingsModel.updateOne(
             { _id:  reading._id},
             {receivedAt:new Date(message.received_at)}
           );
           console.log(rdng);
        }
   
       }
           catch (err) {
               console.log("err occured in saveReading due to : " + err);
               
             }
      };