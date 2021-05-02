const userModel = require("../models/user");
const ticketsService = require("../services/ticketsService");


exports.registerTicket = async (req, res) => {
 
  let ticket = req.body;
  ticket.status = 'New';
  //const {fromDate,toDate,readingRange} = req.body;
   let status = await  ticketsService.registerTicket({ticket});
  
   res.json(status);
   
}
;

exports.getAllTickets = async (req, res) => {

  let response = await  ticketsService.getAllTickets();

  res.json(response);

}

exports.updateTicket = async (req, res) => {

  let {status,ticketId} = req.body;
  let response = await  ticketsService.updateTicket({ticketId,status});

  res.json(response);

}