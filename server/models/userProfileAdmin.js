const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  /*_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },*/
  organisationId: {
    type: String,
    required: true,
  },
  organisationName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  webSite: {
    type: String,
    required: true,
  },
});

//generate hash
UserSchema.methods.generateHash = (password) => {
 // return bcrypt.hashSync(password, 10); //10 salt  rounds
};

UserSchema.methods.isPasswordValid = function(password) {
  //return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.isOldPassword = function(oldPwd, newPwd) {
 // return bcrypt.compareSync(newPwd, oldPwd);
};

const User = mongoose.model("usersAdmin", UserSchema, "usersAdmin");
module.exports = User;
