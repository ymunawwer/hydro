const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  /*_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },*/
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  residentialAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
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

const User = mongoose.model("users", UserSchema, "users");
module.exports = User;
