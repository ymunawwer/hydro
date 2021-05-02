const ticketsModel = require("../models/tickets");
const mongoose = require('mongoose');

   
exports.registerTicket = async ({ticket}) => {

  
    try {
        await new ticketsModel(ticket).save();
        return { success: true };
    }
        catch (err) {
            console.log("err occured in registerTicket due to : " + err);
             return { success: false };            
          }
   };
   
exports.getAllTickets = async () => {

    
    try {
        const tickets = await ticketsModel.find();
        return { success: true ,tickets};
    }
    catch (err) {
        console.log("err occured in registerTicket due to : " + err);
        return { success: false };            
        }
};

exports.updateTicket = async ({ticketId,status}) => {

    
    try {
        const tickets = await ticketsModel.updateOne({_id:mongoose.Types.ObjectId(ticketId)},
            {status});
        return { success: true ,tickets};
    }
    catch (err) {
        console.log("err occured in registerTicket due to : " + err);
        return { success: false };            
        }
};
