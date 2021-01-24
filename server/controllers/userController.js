const userService = require("../services/userService");
const userModel = require("../models/user");
const mongoose = require("mongoose");
const Constants = require("../constants.js");

exports.getUserProfile = async (req, res) => {
  try {
      const user = await userService.getUserProfile({userName:req.body.userName});
        if(user){
        res.status(200).json({success:true,user});
      }else{
        res.status(200).json({success:false,msg:"user doen't exist"});
      }
    
  } catch (err) {
    res.status(200).json({ status: false, message: Constants.API_ERROR_EN });
  }
};


exports.addProfile = async (req, res) => {

  //let user = req.user;
  const isUserExist = await userModel.exists({ userName: req.body.userName });
  if (isUserExist) {
    res
      .status(200)
      .json({ success: false, message: "User already exist" });
    } else {

        try {

        const user1 = await new userModel(req.body).save();

        res
          .status(200)
          .json({ success: true, message: "User successfully saved" });
      }
      catch(err){
        console.log(err);
          res
          .status(200)
          .json({ success: false, message: "User not saved successfully" });
      }
    }
    
  }

exports.updateUserProfile = async (req, res) => {
  try {
      const response = await userService.updateUserProfile({user:req.body});
      res.status(200).json(response);
   
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
