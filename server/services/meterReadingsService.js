const readingsModel = require("../models/readings");
const devicesModel = require("../models/devices");
const { base64decode } = require("nodejs-base64");
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');
const serviceHelper = require('../helper/serviceHelper');

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

    let messages = readings.map((reading,index) => {
      //  return JSON.parse(reading.message);
      let message = JSON.parse(reading.message) ;
      let decodedPayload = "",totalReading=0, date = message.received_at;
      let device = message.end_device_ids.device_id;
      if(message.uplink_message){
        decodedPayload = base64decode(message.uplink_message.frm_payload);
        if(['C2N','Leak'].indexOf(decodedPayload) === -1){
        let readings = decodedPayload.split("_");
         readings = readings.slice(0,6); // only first 6 values are readings
         //totalReading  = readings.reduce((total,sum ) => isNaN(sum) ? 0: parseInt(total) + (parseInt(sum) * 10) ,0);
         if(readings[5]){
            totalReading  = (parseInt(readings[5]) - parseInt(readings[0])) * 10 ;
         }
         //date = message.uplink_message.rx_metadata[0].time;
         }
      }
        return {
            //message,
            //decodedPayload,
            totalReading,
            date,
            device
        };
    });
    var dailyReadings = {},weeklyReadings={},monthlyReadings={};
    let availableDevices = ["officemeter","soham-demo","ittinademo"];
    let  defaultReadings = {
            "officemeter" : 0,
            "ittinademo" : 0,
            "soham-demo" : 0
        }
    for(let message of messages){

        if(readingRange === "weekly"){
            let week = moment(message.date).week();

            if(weeklyReadings[week]){
               //if(weeklyReadings[week][message.device]){
               if(availableDevices.indexOf(message.device) > -1){
                weeklyReadings[week][message.device] += message.totalReading;
                }/*else{
                weeklyReadings[week][message.device] = message.totalReading ;
                }*/
            }else{
                //weeklyReadings[week] = {};
                weeklyReadings[week] = defaultReadings;

                //if(weeklyReadings[week][message.device]){
               if(availableDevices.indexOf(message.device) > -1){
                weeklyReadings[week][message.device] += message.totalReading;
                }
              //  weeklyReadings[week][message.device] = message.totalReading || 0;
            }
        }else if(readingRange === "monthly"){

            let month = moment(message.date).format("MMM");

            if(monthlyReadings[month]){
                // weeklyReadings[message.device][week] += message.totalReading;
               // if(monthlyReadings[month][message.device]){
               if(availableDevices.indexOf(message.device) > -1){
                monthlyReadings[month][message.device] += message.totalReading;
                 }/*else{
                    monthlyReadings[month][message.device] = message.totalReading ;
                 }*/
             }else{
                //monthlyReadings[month] = {};
                monthlyReadings[month] = defaultReadings;

               // if(monthlyReadings[month][message.device]){
               if(availableDevices.indexOf(message.device) > -1){
                monthlyReadings[month][message.device] += message.totalReading;
                }
                //monthlyReadings[month][message.device] = message.totalReading || 0;
             }

             /*if(monthlyReadings[message.device][month]){
                monthlyReadings[message.device][month] += message.totalReading;
            }else{
                monthlyReadings[message.device][month] = message.totalReading || 0;
            }*/

        }else{

            let day = moment(message.date).format("YYYY-MM-DD");

            if(dailyReadings[day]){
                // weeklyReadings[message.device][week] += message.totalReading;
                //if(dailyReadings[day][message.device]){
               if(availableDevices.indexOf(message.device) > -1){
                dailyReadings[day][message.device] += message.totalReading;
                 }/*else{
                 dailyReadings[day][message.device] = message.totalReading ;
                 }*/
             }else{
               //  dailyReadings[day] = {};
                 dailyReadings[day] = defaultReadings;
 

             //  if(dailyReadings[day][message.device]){
               if(availableDevices.indexOf(message.device) > -1){
                dailyReadings[day][message.device] += message.totalReading;
               }
                 //dailyReadings[day][message.device] = message.totalReading || 0;
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
    //console.log("getLatestMeterReading");

    //let latestReading = await  readingsModel.findOne().sort({receivedAt: -1});
    let latestReadings = await  readingsModel.find().sort({_id: -1}).limit(10);
   // console.log(latestReadings);

    let totalReading,date;
    for(let reading of latestReadings){
    let message = JSON.parse(reading.message) ;
      let decodedPayload = "";
      if(message && message.uplink_message){
        decodedPayload = base64decode(message.uplink_message.frm_payload);
        let readings = decodedPayload.split("_");
     /*    readings = readings.slice(0,6); // only first 6 values are readings
        totalReading  = readings.reduce((total,sum ) => parseInt(total) + (parseInt(sum) * 10) ,0);*/
        totalReading = parseInt(readings[5]) * 10;
        date = moment(message.received_at).format("DD-MM-YYYY");
        break;
      }
    }



    //return totalReading;
    return {
        date,
        totalReading
    };

}

exports.saveReading = async ({message,topic,device}) => {

    let reading = {
        message:JSON.stringify(message),
        receivedAt:new Date(message.received_at),
        topic,
        device        
    }
    try {
        const readings = await new readingsModel(reading).save();
            console.log('message saved successfully')
    }
        catch (err) {
            console.log("err occured in saveReading due to : " + err);
            
          }
   };

   
exports.saveDevice = async ({device}) => {

  
    try {
        await new devicesModel(device).save();
        return { success: true };
    }
        catch (err) {
            console.log("err occured in saveDevice due to : " + err);
             return { success: false };            
          }
   };


   exports.updateReadingsCollection = async () => {
   
      
       try {
    let readings = await  readingsModel.find();
    
        for(let reading of readings){
            console.log(reading);
            let message  = JSON.parse(reading.message);
            let device = message.end_device_ids.device_id;
        //  reading.received_at = message.received_at;
           let  rdng  =  await readingsModel.updateOne(
             { _id:  reading._id},
           //  {receivedAt:new Date(message.received_at)}
             {device:device}
           );
           console.log(rdng);
        }
   
       }
           catch (err) {
               console.log("err occured in saveReading due to : " + err);
               
             }
      };

      exports.getLatestDecodedPayloads = async () => {
        try {
            let decodedPayloads = {};
            let readings = await  readingsModel.find().sort({_id:-1});
            
                for(let reading of readings){
                    console.log(reading);
                    let decodedPayload;
                    let message  = JSON.parse(reading.message);
                    if(message && message.uplink_message){
                      decodedPayload = base64decode(message.uplink_message.frm_payload);
                    }
                    decodedPayloads[message.received_at] = {
                        decodedPayload,
                        device:message.end_device_ids.device_id,
                        topic:message.topic,
                    };
                }
           return decodedPayloads;
         }
        catch (err) {
            console.log("err occured in saveReading due to : " + err);
            }
      }


      //get last 24 hrs conumption
      exports.getLast24HrsConsumption = async () => {
        try {
            let decodedPayloads = {};
            let readings = await  readingsModel.find({device:'ittinademo'}).sort({_id:-1}).limit(3);
                let totalPayload = "",totalReading=0;
                let totalPayloadArr = [];
            
                //for chking time diff
                
                let firstReading  = readings[0];
                let firstMessage  = JSON.parse(firstReading.message);

                for(let i in readings){
                    let reading  = readings[i];
                    console.log(reading);
                    let decodedPayload;
                    let message  = JSON.parse(reading.message);
                    //chk diff in times
                   /* if(i == 0){
                        if(moment().diff(moment(message.received_at),'hours') > 2){
                            totalPayloadArr =[0,0,0,0,0,0];
                            continue;
                         }
                    }else */
                    if(i==1){
                        if(moment(firstMessage.received_at).diff(moment(message.received_at),'hours') > 14){
                         totalPayloadArr =  [0,0,0,0,0,0].concat(totalPayloadArr);
                            continue;
                         }
                    }else if(i==2){
                         
                        if(moment(firstMessage.received_at).diff(moment(message.received_at),'hours') > 26){
                         totalPayloadArr =  [0].concat(totalPayloadArr);
                         continue;
                         }

                    }
                    if(message.uplink_message){
                        decodedPayload = base64decode(message.uplink_message.frm_payload);
                        if(['C2N','Leak'].indexOf(decodedPayload) === -1){
                        let readings = decodedPayload.split("_");
                         readings = readings.slice(0,6); // only first 6 values are readings
                         if(readings[5]){
                             if(i==2){
                                totalPayloadArr = [readings[5]].concat(totalPayloadArr); //prepend
                             }else{
                                totalPayloadArr = readings.concat(totalPayloadArr); //prepend
                             }
                          }else{
                            totalPayloadArr = [0,0,0,0,0,0].concat(totalPayloadArr); //prepend
                          }
                         }
                      }
                }
                let consumption = [];
                //let timings = ['0-2','2-4','4-6','6-8','8-10','10-12','12-14','14-16','16-18','18-20','20-22','22-24'];

                for(let i=1;i<totalPayloadArr.length;i++){
                    let k = i - 1;
                    let consumed = (parseInt(totalPayloadArr[i]) - parseInt(totalPayloadArr[k])) * 10;
                    let obj = {
                        consumed,
                        //timings:timings[k]
                        timings: i * 2 
                    }
                    consumption.push(obj);
                }
           return consumption;
         }
        catch (err) {
            console.log("err occured in saveReading due to : " + err);
            }
      }


      
   
exports.saveBkUp = async () => {

  
       // await new devicesModel(device).save();
       try {
           let loc = path.join(__dirname, "../../backup");
        var data = fs.readFileSync(loc, 'utf8');
        lineReader.eachLine(loc, async  function(line) {
            console.log(line);
            let data = JSON.parse(line);
            let {message,topic} = data;
            let device = message.end_device_ids.device_id;
            let res = await exports.saveReading({message,topic,device});
            console.log(res);
    });
    }
        catch (err) {
            console.log("err occured in saveBkUp due to : " + err);
             return { success: false };            
          }
   };

exports.sendMail = async () => {

    await serviceHelper.sendMail({to:"ykrishnateja1989@gmail.com", subject:"subject", text:'hello test',});
}