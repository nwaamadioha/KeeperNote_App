const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String
},{
    timestamps: true,
});

const Note = mongoose.model("Note", notesSchema);

 module.exports = Note;
