const readingsModel = require("../models/readings");
const devicesModel = require("../models/devices");
const meterDataModel = require("../models/meterData");
const { base64decode } = require("nodejs-base64");
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');
const serviceHelper = require('../helper/serviceHelper');
const { ResumeToken } = require("mongodb");

exports.getMeterReadings = async ({ fromDate,toDate,readingRange}) => {

    let formattedFromDate = moment(fromDate,"DD/MM/YYYY").toDate();
    let formattedToDate = moment(toDate,"DD/MM/YYYY").endOf('day').toDate();
    let availableDevices = ["officemeter","soham-demo","ittinademo"];


    let readingsAggregator = [],matchCriteria = {};

    if(["weekly","monthly"].indexOf(readingRange) > -1){
        matchCriteria = {
            $match: {
              device:{ $in: availableDevices}            
            },
          }
    }else{
        matchCriteria = { $match: { 
            $and: [ 
              {device:{ $in: availableDevices} } ,          
              {
                dateTime: {
                     $gte:formattedFromDate,
                      $lte:formattedToDate
                    }
              }    
            ]
        }
      }  
    }

    readingsAggregator.push(matchCriteria);
    readingsAggregator = readingsAggregator.concat(
     [{
        $group: {
            _id:{
                device:"$device",
             date:{$dateToString: {
              //  format: "%Y-%m-%d", date: "$dateTime" ,timezone: "+05:30"
                format: "%Y-%m-%d", date: "$dateTime" 
              }}
            },      
        maxValue : {$max : "$reading"} , 
        minValue : {$min : "$reading"},
        },
        
     },
     {
         $addFields : {
             consumption : {$subtract: [ "$maxValue", "$minValue" ]}
         }
     },
     {
         $group:{
             _id: "$_id.device",
             readings: { $push: {
                date:"$_id.date",
                consumption:"$consumption",
             } 
        }
         }
     }]
     );
    let readings = await  meterDataModel.aggregate(readingsAggregator);

    /*let messages = readings.map((reading,index) => {
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
    });*/
    var dailyReadings = {},weeklyReadings={},monthlyReadings={};
    let  defaultReadings = {
            "officemeter" : 0,
            "ittinademo" : 0,
            "soham-demo" : 0
        }
    for(let message of readings){
        for(let dailyConsumption of message.readings){

        if(readingRange === "weekly"){
            let week = moment(dailyConsumption.date).week();

            if(weeklyReadings[week]){
              // if(availableDevices.indexOf(message.device) > -1){
                if(availableDevices.indexOf(message._id) > -1){
                weeklyReadings[week][message._id] += (dailyConsumption.consumption * 10);
                }
            }else{
                weeklyReadings[week] = JSON.parse(JSON.stringify(defaultReadings));

               if(availableDevices.indexOf(message._id) > -1){
                weeklyReadings[week][message._id] += (dailyConsumption.consumption * 10);
                }
            }
        }else if(readingRange === "monthly"){

            let month = moment(dailyConsumption.date).format("MMM");

            if(monthlyReadings[month]){
               if(availableDevices.indexOf(message._id) > -1){
                monthlyReadings[month][message._id] += (dailyConsumption.consumption * 10);
                 }
             }else{
                monthlyReadings[month] = JSON.parse(JSON.stringify(defaultReadings));

               if(availableDevices.indexOf(message._id) > -1){
                monthlyReadings[month][message._id] += (dailyConsumption.consumption * 10);
                }
             }

        }else{

            let day = moment(dailyConsumption.date).format("YYYY-MM-DD");

            if(dailyReadings[day]){
               if(availableDevices.indexOf(message._id) > -1){
                   let consumption  = dailyConsumption.consumption * 10; // diff. *10
                   //round off to two decimals 
                   consumption = Math.round(consumption * 100)/100
                    dailyReadings[day][message._id] = consumption;
                 }
             }else{
                 dailyReadings[day] = JSON.parse(JSON.stringify(defaultReadings));
 

               if(availableDevices.indexOf(message._id) > -1){
                let consumption  = dailyConsumption.consumption * 10; // diff. *10
                //round off to two decimals 
                consumption = Math.round(consumption * 100)/100
                dailyReadings[day][message._id] = consumption;
               }
             }
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

    //sort daily readings
    if(Object.keys(dailyReadings).length > 0){
        meterReadings.sort((reading1,reading2) => moment(reading1.date).diff(moment(reading2.date)))
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

//temp
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
           // let readings = await  readingsModel.find({device:'ittinademo'}).sort({_id:-1}).limit(3);

           

            let formattedFromDate = moment.utc().subtract(26,'hours').toDate();
            let formattedToDate = moment.utc().toDate();
            let readings = await  meterDataModel.find(
                {device:{ $in: ["ittinademo", "officemeter", "soham-demo"]},
                dateTime: {
                 $gte:formattedFromDate,
                 $lte:formattedToDate
               }}).sort({dateTime:-1}).limit(15);
            
                let last24Hrs = {
                    "ittinademo":[],
                    "officemeter":[],
                    "soham-demo":[],
                };

                for(let i = 0; i< readings.length-1;i++){
                    let currentReading = readings[i];
                    let prevReading = readings[i+1];
                    last24Hrs[currentReading.device].push({
                        time:currentReading.dateTime,
                        reading: (currentReading.reading - prevReading.reading) *10 ,
                    });
                }



           return last24Hrs;
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

//temporary
exports.interpretMeterReadings = async () => {

    try {
        let readings = await  readingsModel.find().sort({_id:1});
        
            for(let reading of readings){
                console.log(reading);
                let message  = JSON.parse(reading.message);

                 // read data 

                await  exports.interpretMeterMessage({message});
      
      }

    }
       
    
    catch (err) {
        console.log("err occured in saveReading due to : " + err);
            
    }
}

const getMinutes = (time) => {

    let [HH,mm] = time.split(':');

    return (parseInt(HH) * 60) + parseInt(mm);
}


exports.interpretMeterMessage = async ({message}) => {


    let decodedPayload = "",totalReading=0, utcDate = moment.utc(message.received_at),
            formattedReceivedDate = moment.utc(message.received_at).format('YYYY-MM-DD HH:mm'); //timezone issues with 'Z' format
      if(message.uplink_message){
        decodedPayload = base64decode(message.uplink_message.frm_payload);
        if(['C2N','Leak'].indexOf(decodedPayload) === -1){
        let readings = decodedPayload.split("_");
         readings = readings.slice(0,6); // only first 6 values are readings
         let cutOffReading,cutOffIndex;
         if(readings[5]){   //valid data
            //modified
            let device = message.end_device_ids.device_id
            let  dateTimeReadings = [];let cutOffReadingGiven = false;
            //for(let i =0; readings){
            for(let i=5,hrs=0;i>=0;i--){
                let currentReading = readings[i];
                let dateTime = moment(formattedReceivedDate).subtract(hrs,'hours').toDate();
                if(moment(dateTime).isSame(moment(formattedReceivedDate), 'day') || cutOffReadingGiven === true){
                    let dateTimeReading = {
                        dateTime : dateTime,
                         reading:parseFloat(currentReading),
                        device
                    };
                    dateTimeReadings.push(dateTimeReading);

                }else {
                    let prevReading = readings[i+1];

                    // Your moment at midnight
                    let mmtMidnight = moment(message.received_at).clone().startOf('day');
                    // Difference in minutes
                    let diffMinutes = mmtMidnight.diff(moment(dateTime), 'minutes');

                    let diffReadings = prevReading - currentReading ;

                    // define cutOffReading in the ratio of diff in minutes
                    let cutOffReading = Math.round(parseFloat(currentReading) + ((diffMinutes/120) * diffReadings));
                    
                    let dateTimeCutOffReading = {
                        dateTime : mmtMidnight.toDate(),
                         reading:cutOffReading,
                        device
                    };
                    dateTimeReadings.push(dateTimeCutOffReading);
                    
                    let dateTimeReading = {
                        dateTime : dateTime,
                        reading:parseFloat(currentReading),
                        device
                    };
                    dateTimeReadings.push(dateTimeReading);

                    cutOffReadingGiven = true;
                }
                
                hrs = hrs + 2;

                //corner case scenario of first reading being in between 00:00 & 02:00
                if(i==0 && cutOffReadingGiven === false){
                  let prevDateTime = moment(formattedReceivedDate).subtract(hrs,'hours').toDate();
                
                    if(moment(prevDateTime).isSame(moment(formattedReceivedDate), 'day') == false){
                         prevDateTime = moment(prevDateTime).subtract(1,'hours').toDate(); // 1 more for removing strict 2 hrs check

                        let results = await  meterDataModel.find({
                            dateTime : {
                                $gte:prevDateTime,
                                 $lte:dateTime
                            },
                        });
                        if(results.length > 0 ){
                            
                            let prevReading = results[0].reading;
                            // Your moment at midnight
                            let mmtMidnight = moment(message.received_at).clone().startOf('day');
                            // Difference in minutes
                            let diffMinutes = mmtMidnight.diff(moment(prevDateTime), 'minutes');
        
                            let diffReadings =  currentReading -  prevReading ;
        
                            // define cutOffReading in the ratio of diff in minutes
                            let cutOffReading = prevReading + ((diffMinutes/120) * diffReadings);
                            
                            let dateTimeCutOffReading = {
                                dateTime : mmtMidnight.toDate(),
                                reading:parseFloat(cutOffReading),
                                device
                            };
                            dateTimeReadings.push(dateTimeCutOffReading);

                            //end of prev day at 11:59
                            let prevEndOfDay = moment(prevDateTime).clone().endOf('day');

                            dateTimeReadings.push({
                                dateTime : prevEndOfDay.toDate(),
                                reading:parseFloat(cutOffReading),
                                device
                            });

                            //current 
                            let dateTimeReading = {
                                dateTime : dateTime,
                                reading:parseFloat(currentReading),
                                device
                            };
                            dateTimeReadings.push(dateTimeReading);

                        }

                    }
                }

            }


            console.log('#####');   
            
            // bulk save
            //const result = await new meterDataModel(data).save();
            
          const response = await meterDataModel.insertMany(dateTimeReadings);


         //dateTimeReadings.sort((a,b) => moment(a.dateTime).diff(b.dateTime));

         
            console.log('data saved successfully');   


              
             
            }
          }
         }

}