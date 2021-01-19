const express = require("express");
const app = express();
const meterReadingsController = require("../controllers/meterReadingsController");

app.get("/getMeterReadings", meterReadingsController.getMeterReadings);

module.exports = app;
