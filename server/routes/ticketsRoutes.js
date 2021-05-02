const express = require("express");
const app = express();
const ticketsController = require("../controllers/ticketsController");

app.get("/getAllTickets", ticketsController.getAllTickets);
app.post("/registerTicket", ticketsController.registerTicket);
app.post("/updateTicket", ticketsController.updateTicket);


module.exports = app;
