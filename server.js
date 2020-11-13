//4OEBVkVcvXF33z3G
//mongodb+srv://avaneesh:4OEBVkVcvXF33z3G@cluster0.tpggp.mongodb.net/SIMPLYTURN?retryWrites=true&w=majority

const exp = require("express");
const app = exp(); // express obj
const path = require("path");
const mc = require("mongodb").MongoClient;


//connect server.js with sportsvenue app of dist folder
app.use(exp.static(path.join(__dirname, "./dist/SimplyturnTask2")));

const _portnum = 3000 || process.env.PORT;

const bodyParser = require("body-parser"); // for the purpose of converting object into json
app.use(bodyParser.json()); //middleware for above purpose

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,PATCH,OPTIONS"
  );

  next();
});

//api
const userApi = require("./backend/apis/userApi");
const noteApi = require("./backend/apis/noteApi");


mc.connect(
  "mongodb+srv://avaneesh:4OEBVkVcvXF33z3G@cluster0.tpggp.mongodb.net/SIMPLYTURN?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log("Error while connecting to db!");
    } else {
      console.log("connected to db...!");
      dbo = client.db("SIMPLYTURN");
      app.locals.usersCollectionObj = dbo.collection("users");
      app.locals.notesCollectionObj = dbo.collection("notes");

      app.listen(process.env.PORT || 3000, (err) => {
        if (err) {
          const error = new Error(
            "Error while assigning a port number , please try again later"
          );
          error.status = 404;
          console.log("Error while assigning a port number");
        } else {
          console.log(`server listening on port number ${_portnum}`);
        }
      });


    }
  }
);

//handling reload
// app.post("/onReload", verifyToken, (req, res, next) => {
//   const userID = req.body.onReloadUserID;

//   var usercollectionObj = req.app.locals.usersCollectionObj;

//   usercollectionObj.findOne({ _id: new ObjectId(userID) }, (err, result) => {
//     if (err) {
//       return res.status(401).json({ message: "error invalid request" });
//     }

//     res.status(200).json({ message: "success", userDetails: result });
//   });
// });


app.use("/users", userApi);
app.use("/notes", noteApi);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//we can call this middleware from anywhere
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./dist/SimplyturnTask2/index.html"));
});
