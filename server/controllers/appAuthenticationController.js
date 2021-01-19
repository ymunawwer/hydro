const userModel = require("../models/user");
const cryptoLib = require("cryptlib");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.mappLoginUser = async (req, res) => {
  let invalidUser = {
    success: false,
    message: "Invalid username and password",
    data: req.body,
  };
  try {
    const KEY = process.env.APP_KEY;
    const IV = process.env.APP_IV;
    const shaKey = cryptoLib.getHashSha256(KEY, 32);
    const version = req.headers["version"] ? req.headers["version"] : undefined;
    const authKey = req.headers["authkey"] ? req.headers["authkey"] : undefined;
    const language = req.headers["language"]
      ? req.headers["language"]
      : undefined;
    if (authKey && req.body && req.body.userName && req.body.password) {
      let headerUserName = cryptoLib.decrypt(authKey, shaKey, IV);
      if (headerUserName !== req.body.userName) {
        return res.status(200).json(invalidUser);
      }
      const user = await userModel.findOne(
        { userName: req.body.userName },
        "isEmailVerified userName password name roleId isCorporateAdmin isSuperAdmin email twoStepVerification phone userProfileId"
      );
      if (user && !user.isEmailVerified) {
        res.status(200).json({
          success: false,
          message: "Please verify the invitation sent and change the password",
          data: null,
        });
        return;
      }
      if (user && user.isSuperAdmin) {
        return res.status(200).json(invalidUser);
      }
      let validPwd = await user.isPasswordValid(req.body.password);
      if (validPwd === false) {
        return res.status(200).json(invalidUser);
      }
      const userObj = {
        userName: req.body.userName,
        device: req.body.device,
        type: "user",
      };
      const secureObj = cryptoLib.encrypt(JSON.stringify(userObj), shaKey, IV);
      const token = jwt.sign({ data: secureObj }, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });
      const serverTime = moment.utc().valueOf();

      const response = {
        isEmailVerified: user.isEmailVerified,
        userId: user._id,
        userName: user.userName,
        lastName: user.lastName,
        isSuperAdmin: user.isSuperAdmin,
        email: user.email,
        phone: user.phone,
        twoStepVerification: user.twoStepVerification,
        isCorporateAdmin: user.isCorporateAdmin,
        name: user.name,
        companyId: user.userProfileId,
        accessToken: token,
        serverTime: serverTime,
      };
      res.status(200).json({ success: true, data: response });
    } else {
      res.status(200).json(invalidUser);
    }
  } catch (err) {
    res.status(200).json(invalidUser);
  }
};

exports.verifySecuredToken = async (req, res, next) => {
  const KEY = process.env.APP_KEY;
  const IV = process.env.APP_IV;
  const shaKey = cryptoLib.getHashSha256(KEY, 32);
  const token = req.headers["authorization"]
    ? req.headers["authorization"]
    : undefined;
  const version = req.headers["version"] ? req.headers["version"] : undefined;
  const authKey = req.headers["authkey"] ? req.headers["authkey"] : undefined;
  const language = req.headers["language"]
    ? req.headers["language"]
    : undefined;

  if (authKey && token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, data) => {
      if (error) {
        return res.sendStatus(401);
      } else {
        const secureObj = JSON.parse(cryptoLib.decrypt(data.data, shaKey, IV));
        const headerUserName = cryptoLib.decrypt(authKey, shaKey, IV);
        if (headerUserName == secureObj.userName) {
          req.authDetails = {
            userName: secureObj.userName,
            device: secureObj.device,
            type: secureObj.type,
          };
          next();
        } else {
          return res.sendStatus(401);
        }
      }
    });
  } else {
    return res.sendStatus(401);
  }
};
