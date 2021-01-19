const loginService = require("../services/loginService");
const otpGenerator = require("otp-generator");
const userModel = require("../models/user");
const isEmpty = require("lodash.isempty");
const { base64encode } = require("nodejs-base64");
const mongoose = require("mongoose");
const publicIp = require("public-ip");
const randomstring = require("randomstring");
var TinyURL = require("tinyurl");
const { base64decode } = require("nodejs-base64");
const authenticationService = require("../services/authenticationService");
const authenticationController = require("../controllers/authenticationController");
const Constants = require("../constants.js");


exports.changePassword = async ({ body }, res) => {
  try {
    const data = await loginService.validatePasswordAndProceed(body);
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ success: false, message: Constants.API_ERROR_EN });
  }
};

exports.resetPassword = async ({ body }, res) => {
  res.json(
    await loginService.resetPassword(body.encodedUserName, body.newPassword)
  );
};


exports.getUser = async (req, res) => {
  const user = await userModel.findOne({
    _id: req.params.userId,
  });
  try {
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(200).json({ success: false, data: user });
  }
};



module.exports = exports;
