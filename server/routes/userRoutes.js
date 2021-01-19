const express = require("express");
const app = express();
const authenticationController = require("../controllers/authenticationController");
const loginController = require("../controllers/loginController");
const authenticationService = require("../services/authenticationService");
const userController = require("../controllers/userController");

app.post("/login", authenticationController.loginUser);

// app.post(
//   "/userInfo",
//   authenticationService.validateHeaderSessionToken,
//   authenticationController.userInfo
// );

app.get("/logout", authenticationController.logoutUser);


app.post("/changePassword", loginController.changePassword);
app.post("/resetPassword", loginController.resetPassword);

app.get(
  "/user/:userId",
  authenticationService.validateHeaderSessionToken,
  loginController.getUser
);


app.post(
  "/updateSettingsDetails",
  authenticationService.validateHeaderSessionToken,
  userController.updateUserDetails
);


app.post("/forgotUserId", userController.sendForgotUserIdMail);

module.exports = app;
