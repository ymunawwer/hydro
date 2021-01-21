const meterReadingsService = require("../services/meterReadingsService");
var mqtt=require('mqtt');

exports.getMeterReadings = async (req, res) => {

var client = mqtt.connect("mqtt://eu1.cloud.thethings.industries:1883",
//var client = mqtt.connect("mqtt://broker.hivemq.com",
{
  clientId:"hydroid",
  username:"watermeter@cybereye",
  //password:"NNSXS.R6IRFBBCZG2NXHAHGYBE4NKLKJDHU3FDNDXHY7I.6LFRRGEAMEZLCYVK2D7T2MBQH73ORIS3ZJBN322S57ECYIBG46VQ",
  password:"NNSXS.3H3R5H6SAFW6KWUA55DNPA2Z2CR2K733VMHEXBI.WUTTHDZCQZPQCWRIJW7FLNT5V3S2QTUOE33EVBWD4W3YQ2GMI37A",
  //port:"1883",
})
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


  

};

module.exports = exports;
