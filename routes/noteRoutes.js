const express = require('express');
const router = express.Router();
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');

// Map base routes
router.route('/')
  .get(getAllNotes)
  .post(createNote);

// Map ID-specific routes
router.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
