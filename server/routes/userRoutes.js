const express = require("express");
const app = express();
const authenticationController = require("../controllers/authenticationController");
const loginController = require("../controllers/loginController");
const authenticationService = require("../services/authenticationService");
const userController = require("../controllers/userController");

app.post("/login", authenticationController.loginUser);

app.get("/logout", authenticationController.logoutUser);


app.post("/addProfile", userController.addProfile);

app.post("/admin/addProfile", userController.addProfileForAdmin);


app.post("/updateUserProfile", userController.updateUserProfile);

app.post("/getUserProfile", userController.getUserProfile);


app.post("/changePassword", loginController.changePassword);
app.post("/resetPassword", loginController.resetPassword);

app.get(
  "/user/:userId",
  authenticationService.validateHeaderSessionToken,
  loginController.getUser
);



app.post("/forgotUserId", userController.sendForgotUserIdMail);

module.exports = app;
