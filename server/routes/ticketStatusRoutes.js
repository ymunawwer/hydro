const express = require("express");
const app = express();
const ticketReqStatusController = require("../controllers/ticketReqStatusController");

app.get("/getReqTickets", ticketReqStatusController.getReqTickets);


module.exports = app;
