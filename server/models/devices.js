const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const DevicesSchema = mongoose.Schema({
  /*_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },*/
  organisationID: {
    type: String,
    required: true,
  },
  deviceID: {
    type: String,
   // required: true,
  },
  serialID: {
    type: String,
  //  required: true,
  },
  type: {
    type: String,
   // required: true,
  },
  network: {
    type: String,
    //required: true,
  },
  user: {
    type: String,
    //required: true,
  },
  country: {
    type: String,
   // required: true,
  },
  leakageLimit: {
    type: String,
   // required: true,
  },
  dataTransmissionTime: {
    type: String,
    //required: true,
  },
});


const Device = mongoose.model("devices", DevicesSchema, "devices");
module.exports = Device;
