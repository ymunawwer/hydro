const jwt = require("jsonwebtoken");
const cryptoLib = require("cryptlib");
const shaKey = cryptoLib.getHashSha256(process.env.APP_KEY, 32);
//const redis = require("redis");
//const redisClient = redis.createClient();
const { base64encode } = require("nodejs-base64");
const crypto = require("crypto");

/*
redisClient.on("error", function(err) {
  console.log("could not establish a connection with redis. " + err);
});
redisClient.on("connect", function(err) {
  console.log("connected to redis successfully");
});
*/

exports.generateJWTToken = async (user, expiresIn) => {
  try {
    const encryptPayload = cryptoLib.encrypt(
      JSON.stringify(user),
      shaKey,
      process.env.APP_IV
    );
    const jwtToken = jwt.sign(
      { data: encryptPayload },
      process.env.ACCESS_TOKEN,
      { expiresIn: expiresIn }
    );
    return jwtToken;
  } catch (err) {
    return null;
  }
};

exports.validateHeaderToken = async (req, res, next) => {
  const authorization = req.headers["authorization"]
    ? req.headers["authorization"]
    : null;
  const authkey = req.headers["authkey"] ? req.headers["authkey"] : null;
  if (authorization == null || authkey == null) {
    return res.sendStatus(401);
  }
  const headerToken = authorization && authorization.split(" ")[1];
  jwt.verify(headerToken, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    const payLoadObj = JSON.parse(
      cryptoLib.decrypt(user.data, shaKey, process.env.APP_IV)
    );
    const headerUserName = cryptoLib.decrypt(
      authkey,
      shaKey,
      process.env.APP_IV
    );
    if (headerUserName !== payLoadObj.name) {
      return res.sendStatus(401);
    }
    req.user = payLoadObj;
    next();
  });
};

exports.validateHeaderSessionToken = async (req, res, next) => {
  try {
    let sid, sessionKey;
    let mobileApp = false;
    //console.log('session id:', req.session.id);

    sessionKey = `sess:${req.session.id}`;
    // sessionId (sid) will get from req header for Mapp
    sid = req.headers["sid"] ? req.headers["sid"] : null;
    if (sid) {
      mobileApp = true;
      sessionKey = `sess:${sid}`;
    }

    redisClient.get(sessionKey, (err, data) => {
      //console.log('session data in redis:', data);

      if (err || data == null) return res.sendStatus(440);

      if (mobileApp) {
        let redisData = JSON.parse(data);
        req.session.key = {
          accessToken: redisData.key.accessToken,
        };
      }

      const accessToken =
        req.session && req.session.key && req.session.key.accessToken
          ? req.session.key.accessToken
          : null;
      const authorization = req.headers["authorization"]
        ? req.headers["authorization"]
        : null;
      const authkey = req.headers["authkey"] ? req.headers["authkey"] : null;
      if (accessToken == null || authorization == null || authkey == null) {
        return res.sendStatus(401);
      }

      const headerToken = authorization && authorization.split(" ")[1];
      if (headerToken !== accessToken) return res.sendStatus(401);

      jwt.verify(headerToken, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
          return res.sendStatus(401);
        }
        const payLoadObj = JSON.parse(
          cryptoLib.decrypt(user.data, shaKey, process.env.APP_IV)
        );
        const headerUserName = cryptoLib.decrypt(
          authkey,
          shaKey,
          process.env.APP_IV
        );
        if (headerUserName !== payLoadObj.name) {
          return res.sendStatus(401);
        }
        req.user = payLoadObj;
        next();
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, data: "Authentication Failed" });
  }
};



exports.apiTempAuthentication = async (req, res, next) => {
  try {
    const token = req.headers["token"] ? req.headers["token"] : null;
    if (token == null || token !== process.env.ERP_API_TOKEN) {
      return res.sendStatus(401);
    }
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

exports.apiAuthentication = async (req, res, next) => {
  try {
    const client_id = req.headers["client_id"]
      ? req.headers["client_id"]
      : null;
    const client_secret = req.headers["client_secret"]
      ? req.headers["client_secret"]
      : null;

    const clientSignature = req.headers["signature"]
      ? req.headers["signature"]
      : null;

    if (client_id == null || client_secret == null || clientSignature == null) {
      return res.sendStatus(401);
    }

    let encode = base64encode(JSON.stringify(req));
    encode = encode + process.env.ERP_SHA_SECURITY_STRING;
    let signature = sha256(encode);

    if (
      client_id !== process.env.CLIENT_ID ||
      client_secret !== process.env.CLIENT_SECRET ||
      clientSignature !== signature
    ) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

function sha256(str) {
  let hash = crypto
    .createHash("sha256")
    .update(str)
    .digest("hex");
  return hash;
}
