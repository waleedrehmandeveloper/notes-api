const Note = require('../models/Note');

/**
 * @desc    Retrieve all notes
 * @route   GET /api/notes
 * @access  Public
 */
const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Notes retrieved successfully',
      data: notes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Retrieve a single note by ID
 * @route   GET /api/notes/:id
 * @access  Public
 */
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: `Note with id ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note retrieved successfully',
      data: note
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new note
 * @route   POST /api/notes
 * @access  Public
 */
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Explicit validation before passing to model
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    const note = await Note.create({ title, content });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing note
 * @route   PUT /api/notes/:id
 * @access  Public
 */
const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Validate body if fields are sent
    if (title !== undefined && (!title || !title.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Title cannot be empty'
      });
    }

    if (content !== undefined && (!content || !content.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Content cannot be empty'
      });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true, // Return the modified document rather than the original
        runValidators: true // Run schema validation on update
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: `Note with id ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a note
 * @route   DELETE /api/notes/:id
 * @access  Public
 */
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: `Note with id ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};
