const lodash = require("lodash");
const { base64encode } = require("nodejs-base64");
const crypto = require("crypto");
const request = require("request");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const moment = require("moment");
const Constants = require("../constants.js");

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

example = () => {
  var balancereq = {
    OSVBalanceEnquiryRequest: {
      StartDate: date,
      EndDate: date,
      TransactionType: "BE",

      OSVPaymentInfoMessage: [
        {
          OSVPaymentInfoRequest: {
            BankCode: "BSF",
            CompanyCode: "JAZEERA",
            AccountNumbers: {
              AccountNumber: [
                {
                  AccNumber: "BSF1111111111"
                },
                {
                  AccNumber: "BSF2222222222",
                  BICCode: "BSFRSARIXXX"
                }
              ]
            }
          }
        },
        {
          OSVPaymentInfoRequest: {
            BankCode: "ALRAJHI",
            CompanyCode: "JAZEERA",
            AccountNumbers: {
              AccountNumber: [
                {
                  AccNumber: "NCB1111111111"
                }
              ]
            }
          }
        },
        {
          OSVPaymentInfoRequest: {
            BankCode: "NCB",
            CompanyCode: "JAZEERA",
            B2BIdentifier: "ttttt",
            AccountNumbers: {
              AccountNumber: [
                {
                  AccNumber: "NCB3333333333"
                }
              ]
            }
          }
        }
      ]
    }
  };
};

module.exports = exports;
