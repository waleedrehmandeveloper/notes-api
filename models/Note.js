const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    }
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true
  }
);

module.exports = mongoose.model('Note', NoteSchema);
