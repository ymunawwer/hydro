const lodash = require("lodash");
const { base64encode } = require("nodejs-base64");
const crypto = require("crypto");
const request = require("request");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const moment = require("moment");
const Constants = require("../constants.js");
const nodemailer = require("nodemailer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/app/assets/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

//will be using this for uplading
exports.upload = multer({ storage: storage });

exports.buildSignature = req => {
  return new Promise((resolve, reject) => {
    let encode = base64encode(JSON.stringify(req));
    encode = encode + process.env.SHA_SECURITY_STRING;
    let signature = sha256(encode);
    resolve(signature);
  });
};

function sha256(str) {
  let hash = crypto
    .createHash("sha256")
    .update(str)
    .digest("hex");
  return hash;
}

exports.callService = async (req, url, headerData) => {
  var signature = await exports.buildSignature(req);
  console.log("signature~~~~~~~~~~~ " + signature);
  console.log("req~~~~~~~~~~~ " + JSON.stringify(req));

  let headers= {
    "Content-Type": "application/json",
    Accept: "application/json",
    client_operation: headerData.operation,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
   // app_id: "alrahajibank",
    UserId: headerData.userId,
    SVReferenceID: headerData.svRefId,
    Device: "web",
    DateTimeStamp: new Date(),
    CompanyId: headerData.companyId,
    GroupId: headerData.groupId,
    //SVCustomerId: "1234567",
    TransferType: headerData.transferType,
    Signature: signature,
    BaseCurrency: Constants.DEFAULT_CURRENCY
  };

  console.log("headers~~~~~~~~~~~ " + JSON.stringify(headers));

  return new Promise((resolve, reject) => {
    request(
      {
        method: "POST",
        url: url,
        headers:headers ,
        
        body: JSON.stringify(req),
        
      },
      function(error, response, body) {
        console.log("error:", error);
        // console.log('Headers:', JSON.stringify(response.headers));
        //console.log("Response:", body);
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      }
    );
  });
};

exports.logWriter = function(data, filename, folderName, append) {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  let logPath = createLogFolder(folderName);
  logPath = logPath + filename + ".log";
  if (append) {
    var newData = "\n" + data;
    fs.appendFile(logPath, newData, function() {});
  } else {
    fs.writeFileSync(logPath, data);
  }
};

function createLogFolder(folderName) {
  var currentDate = moment().format("DD-MM-YYYY");
  var currentHr = moment().format("HH");
  var logPathDir = path.join(__dirname, "../../../logs");
  if (!fs.existsSync(logPathDir)) {
    fs.mkdirSync(logPathDir);
  }
  logPathDir = path.join(logPathDir + "/" + currentDate);
  if (!fs.existsSync(logPathDir)) {
    fs.mkdirSync(logPathDir);
  }
  logPathDir = path.join(logPathDir + "/" + currentHr);
  if (!fs.existsSync(logPathDir)) {
    fs.mkdirSync(logPathDir);
  }
  logPathDir = path.join(logPathDir + "/" + folderName);
  if (!fs.existsSync(logPathDir)) {
    fs.mkdirSync(logPathDir);
  }
  return logPathDir + "/";
}



exports.sendMail = async ({to, subject, text, attachments}) => {
  // Only needed if you don't have a real mail account for testing
  /* let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });  */

  const transporter = nodemailer.createTransport({
    service:"Gmail",
    //host: "smtpout.secureserver.net",
    //host: "smtp.gmail.com",
    secure: true,
   // secureConnection: false, // TLS requires secureConnection to be false
    //tls: {
   //   ciphers: "SSLv3",
   // },
   // requireTLS: true,
    port: 465,
   // debug: process.env.NODE_ENV === "development" ? true : false,*/
    auth: {
      //user: process.env.EMAIL_AUTH_USER,
      user: "ykrishnateja20@gmail.com",
      //pass: process.env.EMAIL_AUTH_PSWD,
      pass: "YKTeja@222",
    },
  });

  const mailOptions = {
    //from: process.env.EMAIL_AUTH_USER,
    from: "testosv.222@gmail.com",
    to,
    subject,
    html: text,
    attachments,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(
      "Email sent: " + info.response + " :  to " + to + " : subject " + subject
    );
    return {
      status: Constants.SUCCESS,
      message: "Email Sent",
    };
  } catch (err) {
    console.log(err);
    return {
      status: Constants.FAILED,
      message: "Email failed to send, Please try again",
    };
  }
};

module.exports = exports;
