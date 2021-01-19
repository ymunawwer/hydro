const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const loginService = require("../services/loginService");
const Constants = require("../constants.js");
const passwordValidator = require("password-validator");

exports.updateUserDetails = async (req) => {
  let response = { success: false };
  let validUser = true;
  try {
    if (req.updateType != null) {
      let updateType = req.updateType;
      let updateReq = null;
      if (updateType === "userName") {
        const isUserExist = await userModel.exists({
          userName: req.userName,
        });
        if (isUserExist) {
          validUser = false;
          response.message = "Duplicate User";
        } else {
          const user = await userModel.findOne({
            _id: req.userId,
          });
          let validPwd = await user.isPasswordValid(req.password);
          if (!validPwd) {
            validUser = false;
            response.message = "Invalid Password";
          } else {
            updateReq = {
              userName: req.userName,
              modifiedBy: req.loggedInUserId,
              modifiedDate: new Date(),
            };
            response.userName = req.userName;
          }
        }
      } else if (updateType === "password") {
        const user = await userModel.findOne({
          _id: req.userId,
        });
        let validPwd = await user.isPasswordValid(req.oldPassword);
        if (!validPwd) {
          validUser = false;
          response.message = "Invalid Password";
        } else {
          let validate = await pwdValidator(req.password);
          if (validate) {
            let oldPassword = await isOldPwd(user, req.password);
            if (!oldPassword) {
              user.password = user.generateHash(req.password);
              if (user.historyOfPassword.length >= 3) {
                user.historyOfPassword.splice(0, 1);
                user.historyOfPassword.push(user.password);
              } else {
                user.historyOfPassword.push(user.password);
              }
              updateReq = {
                password: user.password,
                historyOfPassword: user.historyOfPassword,
                modifiedBy: req.loggedInUserId,
                modifiedDate: new Date(),
              };
            } else {
              validUser = false;
              response.message =
                "Password shouldn't match with last 3 passwords";
            }
          } else {
            validUser = false;
            response.message = "Password not matching with criteria";
          }
          response.password = req.password;
        }
      } else if (updateType === "phone") {
        const otpResponse = await loginService.findAndVerifyOTP(
          req.userName,
          req.otp
        );
        if (otpResponse.status === "success") {
          updateReq = {
            phone: req.phone,
            countryCode: req.countryCode,
            modifiedBy: req.loggedInUserId,
            modifiedDate: new Date(),
          };
        } else {
          response.message = otpResponse.message;
          response.success = false;
          return response;
        }
        response.countryCode = req.countryCode;
        response.phone = req.phone;
      } else if (updateType === "email") {
        const user = await userModel.findOne({
          _id: req.userId,
        });
        let validPwd = await user.isPasswordValid(req.password);
        if (!validPwd) {
          validUser = false;
          response.message = "Invalid Password";
        } else {
          updateReq = {
            email: req.email,
            modifiedBy: req.loggedInUserId,
            modifiedDate: new Date(),
          };
          response.email = req.email;
        }
      } else if (updateType === "twoStepVerification") {
        updateReq = {
          twoStepVerification: req.twoStepVerification,
          modifiedBy: req.loggedInUserId,
          modifiedDate: new Date(),
        };
        response.twoStepVerification = req.twoStepVerification;
      } else if (updateType === "isActive") {
        updateReq = {
          isActive: req.isActive,
          modifiedBy: req.loggedInUserId,
          modifiedDate: new Date(),
        };
        response.isActive = req.isActive;
      } else {
        validUser = false;
        response.message = Constants.API_ERROR_EN;
      }
      if (validUser) {
        const filter = { _id: req.userId };
        let resp = await userModel.findOneAndUpdate(filter, updateReq);
        if (resp != null) {
          response.success = true;
          if (updateType === "password")
            await loginService.passwordChangedNotification(resp.email);
        } else {
          response.success = false;
        }
      }
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
