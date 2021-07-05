const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Note = mongoose.model("Note");

/**
 * Returns the list of all the available notes.
 */
router.get("/api/v1/notes", async (req, res) => {
  let notes = [];
  try {
    notes = await Note.find().sort({ updatedAt: -1 });
  } catch (err) {
    console.error(
      "An error occurred while retrieving the list of notes: ",
      err
    );
  }
  return res.status(200).send({ notes });
});

/**
 * Adds a new note with a default body.
 */
router.post("/api/v1/notes", async (req, res) => {
  const note = new Note({ body: "New note " + new Date() });
  try {
    await note.save();
    return res.status(201).send({ note });
  } catch (err) {
    console.error("An error occurred while adding the note: ", err);
    return res.status(500).send({
      message: "An error occurred while adding the note, retry later.",
    });
  }
});

/**
 * Updates a note with the updated body.
 */
router.put("/api/v1/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req.body; // not a good idea to name the text within the note 'body' :) -> future refactor: update body to text or something different from body
  if (!body) {
    return res.status(400).send({ message: "A body parameter is required." });
  }

  try {
    let note = await Note.findById(id);
    if (!note) {
      return res
        .status(404)
        .send({ message: "Note with the specified ID not found: " + id });
    }
    note.body = body;
    await note.save();
    return res.status(200).send({ note });
  } catch (err) {
    console.error("An error occurred while saving the note: ", err);
    return res.status(500).send({
      message: "An error occurred while saving the note, retry later.",
    });
  }
});

module.exports = router;
