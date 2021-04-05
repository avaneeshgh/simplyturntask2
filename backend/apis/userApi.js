const exp = require("express");
const router = exp.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectId;
const verifyToken = require('./../middlewares/verifyToken');


// user collection

//name : text
//rollNo : text
//email: txt
//password :
//class : 1-10
//gender : M/F
//phoneNo : text
//address: text
//designation : teacher/student

router.post("/usersignup", (req, res) => {
  var usercollectionObj = req.app.locals.usersCollectionObj;

  usercollectionObj.findOne({ rollNo: req.body.rollNo}, (err, userObj) => {
    if (err) {
      console.log("error occured during signup form", err);
      res.status(401).json({ message: "Error while Registration! Please Try Again!" });
    } else if (userObj != null) {
      return res.status(401).json({ message: "Roll No Already Exists!" });

    } else {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.log("Error during generating salt", err);
          res.status(401).json({ message: "Error while Registration! Please Try Again!" });
        } else {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              console.log("error during hasing a passsword", err);
              res.status(401).json({ message: "Error while Registration! Please Try Again!" });
            } else {
              req.body.password = hash;

              usercollectionObj.insertOne(req.body, (err, result) => {
                if (err) {
                  console.log("Error occured while inseerting document", err);
                  res.status(401).json({ message: "Error while Registration! Please Try Again!" });
                } else {

                  res.status(200).json({ message: "Successfully Registared!" });

                }
              });
            }
          });
        }
      });
    }
  });
});


//hadle login form
router.post("/login", (req, res, next) => {
  var usercollectionObj = req.app.locals.usersCollectionObj;
  usercollectionObj.findOne({ rollNo: req.body.rollNo }, (err, userObj) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials!" });
    } else {
      if (userObj === null) {
        return res
          .status(401)
          .json({ message: "Invalid Authentication Credentials!" });
      } else {
        bcrypt.compare(req.body.password, userObj.password, (err, result) => {
          if (err) {
            return res
              .status(401)
              .json({ message: "Invalid Authentication Credentials!" });
          } else {
            if (result) {
              let token = jwt.sign(
                {
                  user_id: userObj._id,
                  user_rollNo: userObj.rollNo,
                  user_password: userObj.password,
                  user_designation:userObj.designation
                },
                "simplyturntask2secretkey"
              );

              //modifytoken
              let tokenparts = token.split(".");
              let modiftoken =
                tokenparts[0] +
                "." +
                "brA4BeyQRlsTv0f24peeyJ7Gb9PnPSeysx6Z95OqO" +
                tokenparts[1] +
                "." +
                tokenparts[2];


              res.send({
                message: "successful Login",
                signedToken: modiftoken,
                userObj: userObj,
              });


            } else {
              return res
                .status(401)
                .json({ message: "Invalid Authentication Credentials!" });
            }
          }
        });
      }
    }
  });
});




//getSingleUser
router.post('/getUserDetails',verifyToken, (req, res, next) => {

  const userObj = req.body;
  const payloadUserId = req.body.payloadUserId;

  if (req.body.payloadDesignation == "teacher" || payloadUserId == userObj.id)

  {
  var usercollectionObj = req.app.locals.usersCollectionObj;
  usercollectionObj.findOne({ _id: new ObjectId(userObj.id) },(err, userresult) => {
    if (err) {
      console.log("Error while getting user", err);
      return res.status(401).json({ message: "Failed to get user" });
    }
    else {
      res.status(200).json({ message: "success", userDetails: userresult });
    }

  })

  }
  else
  {
    return res.status(401).json({ message: "Unauthorized access" });
  }

})


//getStudents
router.post('/getAllUsers',verifyToken, (req, res, next) => {
  var usercollectionObj = req.app.locals.usersCollectionObj;
  //return result only if it comes from teacher
  const payloadDesignation = req.body.payloadDesignation;

  if (payloadDesignation !== "teacher")
  {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  usercollectionObj.find({designation:"student"}).toArray((err, usersresult) => {
    if (err) {
      console.log("Error while getting users", err);
      return res.status(401).json({ message: "Failed to get users" });
    }
    else {
      res.status(200).json({ message: "success", usersDetails: usersresult });
    }
  })
})


router.post('/getUserBasedOnToken', verifyToken, (req, res, next) => {

  let userId = req.body.payloadUserId;

  var usercollectionObj = req.app.locals.usersCollectionObj;

  usercollectionObj.findOne({_id: new ObjectId(userId)}, (err, userresult) => {
    if (err) {
      console.log("Error while getting user", err);
      return res.status(401).json({ message: "Failed to get user" });
    }

    res.status(200).json({ message: "success", userDesignation: userresult.designation,userDetails: userresult});


    })

})

module.exports = router;
