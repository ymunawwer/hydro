const userService = require("../services/userService");
const userModel = require("../models/user");
const mongoose = require("mongoose");
const Constants = require("../constants.js");

exports.updateUserDetails = async (req, res) => {
  try {
    if (req.body && req.body.updateType != null) {
      const response = await userService.updateUserDetails(req.body);
      res.status(200).json(response);
    } else {
      res
        .status(200)
        .json({ success: false, message: Constants.API_ERROR_EN, data: {} });
    }
  } catch (err) {
    res.status(200).json({ status: false, message: Constants.API_ERROR_EN });
  }
};

exports.validateUserPwd = async (req, res) => {
  try {
    if (req.body) {
      const response = await userService.validateUserPassword(req.body);
      if (response.success) {
        res.status(200).json(response);
      } else {
        res
          .status(200)
          .json({ success: false, message: "Invalid Request", data: null });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "Invalid Request", data: null });
    }
  } catch (err) {
    res.status(200).json({ status: false, message: Constants.API_ERROR_EN });
  }
};


exports.sendForgotUserIdMail = async (req, res) => {
  try {
    await userService.sendForgetUserIdEmail(req);
    res.status(200).json({ status: true, message: "Success" });
  } catch (err) {
    console.log("err occured in sendForgotUserIdMail due to : " + err);
    res.status(200).json({ status: false, message: Constants.API_ERROR_EN });
  }
};
