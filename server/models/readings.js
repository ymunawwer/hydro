const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const ReadingsSchema = mongoose.Schema({
 /* _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },*/
  message: {
    type: String,
    required: true,
  },
  /*
  timestamp: {
    type: String,
    required: true,
  },*/
});

const User = mongoose.model("readings",ReadingsSchema, "readings");
module.exports = User;
