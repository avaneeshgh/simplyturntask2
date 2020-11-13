const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    tokenparts = token.split(".");

    let part1 = tokenparts[0];
    let part3 = tokenparts[2];
    let part2 = tokenparts[1].substring(41);

    const origToken = part1 + "." + part2 + "." + part3;

    const payload = jwt.verify(origToken, "simplyturntask2secretkey");

    if (!payload) {
      return res.status(401).send("Unauthorized request");
    }

    //verification logic
    req.app.locals.usersCollectionObj.findOne(
      { rollNo: payload.user_rollNo, password: payload.user_password },
      (emailerr, result) => {
        if (emailerr) {
          return res.status(401).json({
            message: "Authentication Failed.Please Login to continue!",
          });
        }
        if (result == null || result == undefined) {
          return res.status(401).json({
            message: "Authentication Failed.Please Login!",
          });
        }

        req.body.payloadUserId = payload.user_id;
        req.body.payloadDesignation = payload.user_designation;


        next();
      }
    );
  } catch (err) {
    res.status(401).json({ message: "Authentication of admin failed" });
  }
};
