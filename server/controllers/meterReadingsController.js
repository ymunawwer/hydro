const meterReadingsService = require("../services/meterReadingsService");
//var ttn = require("ttn")
var mqtt=require('mqtt');

exports.getMeterReadings = async (req, res) => {

  var appID = "watermeter";
var accessKey = "ZJ5IUVU4F6ZNVMVLO7N6MYOKXFSJ4NUXJJ7IEGA";

var client = mqtt.connect("mqtt://eu1.cloud.thethings.industries:1883",
//var client = mqtt.connect("mqtt://broker.hivemq.com",
{
  clientId:"hydroid",
  username:"watermeter@cybereye",
  //password:"NNSXS.R6IRFBBCZG2NXHAHGYBE4NKLKJDHU3FDNDXHY7I.6LFRRGEAMEZLCYVK2D7T2MBQH73ORIS3ZJBN322S57ECYIBG46VQ",
  password:"NNSXS.3H3R5H6SAFW6KWUA55DNPA2Z2CR2K733VMHEXBI.WUTTHDZCQZPQCWRIJW7FLNT5V3S2QTUOE33EVBWD4W3YQ2GMI37A",
  //port:"1883",
})
//NNSXS.3H3R5H6SAFW6KWUA55DNPA2Z2CR2K733VMHEXBI.WUTTHDZCQZPQCWRIJW7FLNT5V3S2QTUOE33EVBWD4W3YQ2GMI37A
  client.on('connect', () => {
    console.log("connected mqqt");
   // client.subscribe('<AppID>/devices/<DevID>/down')
   // client.subscribe('watermeter/devices/riviera-demo/down')
    client.subscribe('#')
    //client.subscribe('watermeter/gateway/connect')
    //client.subscribe('garage/open')
  })

  //handle incoming messages
client.on('message',function(topic, message, packet){
	console.log("message is "+ message);
	console.log("topic is "+ topic);
});

  client.on("error",function(error){ console.log("Can't connect"+error);
})

/*
ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload);
      //added
      res.json(payload);
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
  */

  

};

module.exports = exports;
