const express = require("express");
var session = require("express-session");
//var redis = require("redis");
//var redisStore = require("connect-redis")(session);
//var redisClient = redis.createClient();
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config.json");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express'),
 swaggerDocument = require('./swagger.json');
var logger = require('morgan');
var mqtt=require('mqtt');
var meterReadingService =require('./services/meterReadingsService');


dotenv.config({
  path:
    __dirname +
    `${
      process.env.APP_MODE === "production"
        ? "/./../.env.production" : (process.env.APP_MODE === "preproduction"
        ? "/./../.env.preproduction"
        : "/./../.env")
    }`,
});
console.log(`Your port is ${process.env.PORT}`);
console.log(`Your NODE_ENV is ${process.env.NODE_ENV}`);

const app = express();
const port = process.env.PORT || 3005;

mongoose.connect(process.env.MONGO_DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function callback() {
  console.log("db connected...!");
 /* app.use(
    session({
      secret: "secret",
      name: "_redisPractice",
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
      store: new redisStore({
        host: "localhost",
        port: 6379,
        client: redisClient,
        ttl: process.env.REDIS_TTL,
      }),
    })
  );*/
app.use(logger('dev'));
//app.use("/api", require("./routes/index"));
app.use("/", require("./routes/index")); // /api configured in nginx



//subscribe to devices
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

let message = '{"end_device_ids":{"device_id":"testdevice","application_ids":{"application_id":"watermeter"},"dev_eui":"10000000C9640022","join_eui":"ECFAF4FE00000001","dev_addr":"26088FA3"},"correlation_ids":["as:up:01EWMZ6MACVT0QPHAJVW42XZRP","gs:conn:01EWKD9PCZAN4G79RX6DSC05QT","gs:up:host:01EWKD9PD81QF94NRTSHDZDWEY","gs:uplink:01EWMZ6M3WER98CWGSZGDZ22BJ","ns:uplink:01EWMZ6M3YDV7S47JQDPEE3BJJ","rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01EWMZ6M3Y4KC5GYGHKGPF95FC"],"received_at":"2021-01-22T11:55:47.917189900Z","uplink_message":{"session_key_id":"AXcZJpJPDwV9N/x2UbvO6A==","f_port":1,"f_cnt":95,"frm_payload":"MjQzXzI0NF8yNDRfMjQ3XzI0OV8yNTFfMA==","rx_metadata":[{"gateway_ids":{"gateway_id":"dragino-1d2148","eui":"A840411D21484150"},"time":"2021-01-22T11:55:47.633726Z","timestamp":791690475,"rssi":-33,"channel_rssi":-33,"snr":10,"uplink_token":"ChwKGgoOZHJhZ2luby0xZDIxNDgSCKhAQR0hSEFQEOv5wPkCGgwIw/qqgAYQi/vi0QIg+Ou3o4WFBg==","channel_index":3}],"settings":{"data_rate":{"lora":{"bandwidth":125000,"spreading_factor":7}},"data_rate_index":5,"coding_rate":"4/5","frequency":"865985000","timestamp":791690475,"time":"2021-01-22T11:55:47.633726Z"},"received_at":"2021-01-22T11:55:47.710991095Z","confirmed":true,"consumed_airtime":"0.082176s"}}';
meterReadingService.saveReading({message});
message = '{"end_device_ids":{"device_id":"testdevice","application_ids":{"application_id":"watermeter"},"dev_eui":"10000000C9640022","join_eui":"ECFAF4FE00000001","dev_addr":"26088FA3"},"correlation_ids":["as:up:01EWN2N0DVK8GYWDTSKZFKEH2N","gs:conn:01EWKD9PCZAN4G79RX6DSC05QT","gs:up:host:01EWKD9PD81QF94NRTSHDZDWEY","gs:uplink:01EWN2N07C8SQB98TNERZ26CYC","ns:uplink:01EWN2N07EVJ38S9XXZ9KV3M8Q","rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01EWN2N07D1N6M56NABMZDGFVE"],"received_at":"2021-01-22T12:56:04.796065602Z","uplink_message":{"session_key_id":"AXcZJpJPDwV9N/x2UbvO6A==","f_port":1,"f_cnt":96,"frm_payload":"MjUzXzI1NV8yNTdfMjU5XzI2MV8yNjNfMA==","rx_metadata":[{"gateway_ids":{"gateway_id":"dragino-1d2148","eui":"A840411D21484150"},"time":"2021-01-22T12:56:04.514655Z","timestamp":113600315,"rssi":-30,"channel_rssi":-30,"snr":9.2,"uplink_token":"ChwKGgoOZHJhZ2luby0xZDIxNDgSCKhAQR0hSEFQELvOlTYaDAjklquABhDfqcaYAiD4/OyYp/EF","channel_index":4}],"settings":{"data_rate":{"lora":{"bandwidth":125000,"spreading_factor":7}},"data_rate_index":5,"coding_rate":"4/5","frequency":"866185000","timestamp":113600315,"time":"2021-01-22T12:56:04.514655Z"},"received_at":"2021-01-22T12:56:04.590406931Z","confirmed":true,"consumed_airtime":"0.082176s"}}';
meterReadingService.saveReading({message});
  client.on("error",function(error){ console.log("Can't connect"+error);
})

});


db.on("disconnected", function() {
  console.log("db disconnected...!");
});

/*
app.use(
  cors({
    origin: [
      "http://hydroid.com:3005",
      "http://localhost:3000",
    ], //frontend server localhost:3005
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // enable set cookie
  })
);
*/

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(express.json());
//app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(favicon(path.join(__dirname, "../", "favicon.ico")));
app.use("/uploads", express.static("uploads"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

module.exports = app;
