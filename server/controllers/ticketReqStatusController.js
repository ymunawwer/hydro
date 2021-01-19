const userModel = require("../models/user");
const authenticationService = require("../services/authenticationService");

exports.getReqTickets = async (req, res) => {
  let invalidUser = {
    success: false,
    message: "Invalid username and password",
    data: null,
  };
  try {

    let user = await userModel.findOne(
      { userName: req.body.userName },
      "userName password name"
    );


    if(req.body.userName =="water" && req.body.password=="meter"){
      return res.status(200).json({success:true});

    }else{
      return res.status(200).json({success:false});

    }


  } catch (err) {
    return res.status(200).json(invalidUser);
  }
};
