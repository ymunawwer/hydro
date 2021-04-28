const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const TicketsSchema = mongoose.Schema({
  /*_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },*/
  issue: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  status: {  //  'pending','resolved','Need your reply'
    type: String,
   // required: true,
  },
  lastUpdate: {  
    type: Date,
  //  required: true,
  },  
});


const TicketsModel = mongoose.model("tickets", TicketsSchema, "tickets");
module.exports = TicketsModel;
