const express = require("express");
const app = express();
const meterReadingsController = require("../controllers/meterReadingsController");

app.post("/getMeterReadings", meterReadingsController.getMeterReadings);


app.get("/getLatestMeterReading", meterReadingsController.getLatestMeterReading);

app.get("/updateReadingsCollection", meterReadingsController.updateReadingsCollection);
app.get("/getLatestDecodedPayloads", meterReadingsController.getLatestDecodedPayloads);

app.post("/saveDevice", meterReadingsController.saveDevice);


module.exports = app;
