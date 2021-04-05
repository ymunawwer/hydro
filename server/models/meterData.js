const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const meterDataSchema = mongoose.Schema({
 /* _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },*/
  dateTime: {
    type: Date,
    required: true,
  },
  device:{
    type: String,
    //required: true,
  },
  reading: {
    type:Number,
    required: true,
  },
  /*
  timestamp: {
    type: String,
    required: true,
  },*/
});

const User = mongoose.model("meterData",meterDataSchema, "meterData");
module.exports = User;
