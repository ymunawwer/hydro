const express = require("express");
var session = require("express-session");
var redis = require("redis");
var redisStore = require("connect-redis")(session);
var redisClient = redis.createClient();
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config.json");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express'),
 swaggerDocument = require('./swagger.json');
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
  app.use(
    session({
      secret: "OSVREDIS",
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
  );
  app.use("/api", require("./routes/index"));
});
db.on("disconnected", function() {
  console.log("db disconnected...!");
});

app.use(
  cors({
    origin: [
      "http://95.177.175.225:3005",
      "http://95.177.175.225",
      "http://uat.onesingleview.com",
      "http://uat.onesingleview.com:3005",
      "https://95.177.175.225:3005",
      "https://95.177.175.225",
      "https://uat.onesingleview.com",
      "https://uat.onesingleview.com:3005",
      "http://localhost:3000",
    ], //frontend server localhost:3005
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // enable set cookie
  })
);

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
