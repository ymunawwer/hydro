const userModel = require("../models/user");
const { base64encode, base64decode } = require("nodejs-base64");
const request = require("request");
const maskData = require("maskdata");
const passwordValidator = require("password-validator");
const Constants = require("../constants.js");

exports.validatePasswordAndProceed = async (body) => {
  let encodedUserName = body.encodedUserName;
  try {
    let decodedUserName = base64decode(encodedUserName);

    let user = await userModel.findOne({ userName: decodedUserName });

    if (user) {
      let validPwd = await user.isPasswordValid(body.currentPassword);
      if (validPwd) {
        let newPassword = body.newPassword;
        let validate = await pwdValidator(newPassword);
        if (validate) {
          let oldPassword = await isOldPwd(user, newPassword);
          if (!oldPassword) {
            user.password = user.generateHash(newPassword);
            if (user.historyOfPassword.lenght >= 3) {
              user.historyOfPassword.splice(0, 1);
              user.historyOfPassword.push(user.password);
            } else {
              user.historyOfPassword.push(user.password);
            }
          } else {
            return {
              status: "failed",
              message: "Password shouldn't match with last 3 passwords",
            };
          }
        } else {
          return {
            status: "failed",
            message: "Password not matching with criteria",
          };
        }

        user.isEmailVerified = true;
        await userModel.findOneAndUpdate({ _id: user._id }, user);
        return {
          status: "success",
          message: "New Password updated sucessfully",
        };
      } else {
        return { status: "failed", message: "One Time Password is invalid" };
      }
    } else {
      return { status: "failed", message: Constants.API_ERROR_EN };
    }
  } catch (err) {
    return { status: "failed", message: Constants.API_ERROR_EN, err };
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

exports.resetPassword = async (encodedUserName, newPassword) => {
  try {
    const decodedUserName = base64decode(encodedUserName);
    const user = await userModel.findOne({ userName: decodedUserName });

    if (user) {
      let validate = await pwdValidator(newPassword);
      if (validate) {
        let oldPassword = await isOldPwd(user, newPassword);
        if (!oldPassword) {
          user.password = user.generateHash(newPassword);
          if (user.historyOfPassword.length >= 3) {
            user.historyOfPassword.splice(0, 1);
            user.historyOfPassword.push(user.password);
          } else {
            user.historyOfPassword.push(user.password);
          }
        } else {
          return {
            success: false,
            message: "Password shouldn't match with last 3 passwords",
          };
        }
      } else {
        return {
          success: false,
          message: "Password not matching with criteria",
        };
      }
      let resp = await userModel.findOneAndUpdate({ _id: user._id }, user);
      //let resp = await user.save();
      return { success: true, message: "New Password updated sucessfully" };
    } else {
      return { success: false, message: Constants.API_ERROR_EN };
    }
  } catch (err) {
    return { success: false, message: Constants.API_ERROR_EN };
  }
};

exports.fetchResetPwdUsr = async (uname) => {
  try {
    const user = await userModel
      .findOne({ userName: uname }, "email phone")
      .lean();

    if (user) {
      const maskPhoneOptions = {
        maskWith: "*",
        unmaskedStartDigits: 0,
        unmaskedEndDigits: 4,
      };
      const maskEmailOptions = {
        maskWith: "*",
        unmaskedStartDigits: 1,
        unmaskedEndDigits: 1,
      };
      let split = user.email.split("@");
      const maskedPhoneNumber = maskData.maskPhone(
        user.phone,
        maskPhoneOptions
      );
      const maskedEmail =
        maskData.maskPhone(split[0], maskEmailOptions) + "@" + split[1];
      user.maskedEmail = maskedEmail;
      user.maskedPhoneNumber = maskedPhoneNumber;
      // let maskedData = { maskedPhoneNumber, maskedEmail };
      return { success: true, user };
    } else {
      return { success: false, message: Constants.API_ERROR_EN };
    }
  } catch (err) {
    return { success: false, message: Constants.API_ERROR_EN };
  }
};

module.exports = exports;
