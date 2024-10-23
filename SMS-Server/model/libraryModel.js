const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  borrowedDate: {
    type: Date,
    required: true,
  },
  returnedDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('LibraryHistory', librarySchema);
