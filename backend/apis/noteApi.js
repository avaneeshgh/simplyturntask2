const exp = require("express");
const router = exp.Router();
var ObjectId = require("mongodb").ObjectId;
const verifyToken = require('./../middlewares/verifyToken');

//noteName
//userId
//noteDescription
//createdDate
//lastModifiedDate
//lastModifiedBy




//getAllNotes
router.post('/allNotes',verifyToken, (req, res, next) => {

  const userObj = req.body;

  let notesCollectionObj = req.app.locals.notesCollectionObj;

  notesCollectionObj.find({ userId: userObj.id }).toArray((err, notesresult) => {
    if (err) {
      console.log("Error while getting Notes", err);
      return res.status(401).json({ message: "Failed to get Notes" });
    }
    else {
      res.status(200).json({ message: "success", userAllNotes: notesresult });
    }
  })
})


//get single note
router.post('/getNoteById', verifyToken, (req, res, next) => {

  const noteObj = req.body;
  const payloadUserId = req.body.payloadUserId;
  const payloadDesignation = req.body.payloadDesignation;

  let notesCollectionObj = req.app.locals.notesCollectionObj;

  //check if it is his note or not , if its his note then send it

  notesCollectionObj.findOne({ _id: new ObjectId(noteObj.id) }, (err, noteresult) => {
    if (err) {
      console.log("Error while getting Note", err);
      return res.status(401).json({ message: "Sorry! Note is not present." });
    }

    if (noteresult != null && noteresult != undefined)
    {
      if (payloadDesignation == "teacher")
      {
        res.status(200).json({ message: "Success", noteDetails: noteresult });
      }
      else if (noteresult.userId == payloadUserId)
      {
        res.status(200).json({ message: "Success", noteDetails: noteresult });
      }
      else {
        return res.status(401).json({ message: "Sorry! You dont have access to this note" });
      }
    }
    else
    {
      return res.status(401).json({ message: "Sorry! You dont have access to this note" });
    }


  })
})


//edit note
router.put('/editNote',verifyToken, (req, res, next) => {


  let noteObj = req.body;
  const payloadUserId = req.body.payloadUserId;
  const payloadDesignation = req.body.payloadDesignation;

  const lastModifiedBy = (payloadDesignation == "teacher") ? "Teacher" : "Student";
  const lastModifiedDate = new Date();
  if (payloadDesignation == "teacher" || payloadUserId == noteObj.userId)
  {


    req.app.locals.notesCollectionObj.
      updateOne(
        { _id: new ObjectId(noteObj.noteId) },
        {
          $set:
          {
            noteName: noteObj.newNoteName,
            noteDescription: noteObj.newNoteDescription,
            lastModifiedDate: lastModifiedDate,
            lastModifiedBy: lastModifiedBy
          }
        }, (err, result) => {
          if (err) {
            console.log("Error while Editing Note", err);
            return res.status(401).json({ message: "Sorry! Error While Editing Note! Please Try Again" });
          }


          res.status(200).json({ message: "success" });
        })
  }
  else
  {
    return res.status(401).json({ message: "Sorry! You dont have access to edit this note" });
  }


})


//deletenote
router.post('/deleteNote',verifyToken, (req, res, next) => {

  console.log('stage 1')
  let noteObj = req.body;
  const payloadUserId = req.body.payloadUserId;
  const payloadDesignation = req.body.payloadDesignation;

  console.log(payloadUserId,noteObj.userId);
  if (payloadDesignation == "teacher" || payloadUserId!==noteObj.userId)
  {
    return res.status(401).json({ message: "Sorry! You dont have access to delete this note" });
  }
  else {
   console.log('valid user');
    req.app.locals.notesCollectionObj.
      deleteOne({ _id: new ObjectId(noteObj.noteId) }, (err, result) => {
        if (err) {
          console.log("Error while Deleting Note", err);
          return res.status(401).json({ message: "Sorry! Error While Deleting Note! Please Try Again" });
        }
        console.log('deleted');
        console.log(result);
        res.status(200).json({ message: "success" });
    })
  }

})


//savenote
router.post('/saveNote', verifyToken,(req, res, next) => {

  let noteObj = req.body;
  let notesCollectionObj = req.app.locals.notesCollectionObj;

  noteObj.createdDate = new Date();
  noteObj.lastModifiedDate = new Date();
  noteObj.lastModifiedBy = "Student";
  noteObj.userId = req.body.payloadUserId;

  delete noteObj['payloadUserId'];
  delete noteObj['payloadDesignation'];


  console.log(noteObj);

  notesCollectionObj.insertOne(noteObj, (err, result) => {
    if (err) {
      console.log("Error while saving Note", err);
      return res.status(401).json({ message: "Error while saving Note! Please Try Again" });
    }

    return res.status(200).json({ message: "successfully saved",noteDetails:noteObj });

  });

})


module.exports = router;
