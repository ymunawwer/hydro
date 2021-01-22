const userModel = require("../models/user");
//const bcrypt = require("bcrypt");
const loginService = require("../services/loginService");
const Constants = require("../constants.js");
const passwordValidator = require("password-validator");


exports.getUserProfile = async ({userName}) => {

  let user = await userModel.findOne(
    { userName: userName },
    "userName email firstName lastName phone residentialAddress city state zip"
  );

    return user;
};


exports.updateUserProfile = async ({user}) => {

  let response = { success: false };

  try {

        const isUserExist = await userModel.exists({
          userName: user.userName,
        });
      
      if (isUserExist) {
        //const filter = { _id: req.userId };
        const filter = {  userName: user.userName };
        let resp = await userModel.findOneAndUpdate(filter, user);
        if (resp != null) {
          response.success = true;
        } else {
          response.success = false;
        }
      }else{
        response.message = "user doen't exist";

      }
    

    return response;

  } catch (err) {
    console.log("err occured in updateUserDetails due to : " + err);
    return response;
  }

};

exports.validateUserPassword = async (req) => {
  let response = { success: false };
  try {
    if (
      req.userName != null &&
      req.password != null &&
      req.companyProfileId != null
    ) {
      const isUserExist = await userModel.exists({
        userName: req.userName,
        password: req.password,
        fk_company_id: [req.companyProfileId],
      });
      if (isUserExist) {
        console.log("isUserExist  " + isUserExist);
        response.success = true;
      }
    }
    return response;
  } catch (err) {
    console.log("err occured in validateUserPassword due to : " + err);
    return response;
  }
};




pwdValidator = async (newPassword) => {
  let schema = new passwordValidator();
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(20) // Maximum length 20
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .symbols() // Must have symbols
    .has()
    .not()
    .spaces(); // Should not have spaces

  return schema.validate(newPassword);
};

isOldPwd = async (user, newPassword) => {
  let oldPassword = false; // Blacklist old passwords
  for (let pwd of user.historyOfPassword) {
    oldPassword = await user.isOldPassword(pwd, newPassword);
    if (oldPassword) break;
  }
  return oldPassword;
};
