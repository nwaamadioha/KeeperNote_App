const router = require("express").Router();
let Note = require("../models/notes.model");

router.route("/").get(function(req, res){
    Note.find()
      .then(notes => res.json(notes))
      .catch(err => res.status(400).json("Error: " + err));
}).post((req, res) => {
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const note = new Note({
      title: newTitle,
      content: newContent
    });
    note.save()
      .then(() => {
          res.json("New note added")
      })
      .catch(err=>{
          res.status(400).json("Error: " + err);
      });
});

router.route("/:id").delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json("Note deleted")
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;