const mongoose = require('mongoose');
const LibraryHistory = require('../model/libraryModel');

// Add new library history record
exports.addLibraryRecord = async (req, res) => {
  const { studentId, bookTitle, borrowedDate, returnedDate, status } = req.body;

  if (!studentId || !bookTitle || !borrowedDate || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const libraryRecord = await LibraryHistory.create({ studentId, bookTitle, borrowedDate, returnedDate, status });
    // await libraryRecord.save();
    res.status(200).json({
      success: true,
      libraryRecord,
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};


// Get library records
exports.getLibraryRecords = async (req, res) => {
  try {
    const libraryRecords = await LibraryHistory.find(); // Assuming you have a LibraryRecord model

    if (!libraryRecords || libraryRecords == '') {
      res.status(400).json({ message: 'Library Records not found!' });
    } else {
      res.status(200).json({
        success: true,
        libraryRecords
      });
    }


  } catch (error) {
    res.status(500).json({ message: 'Error fetching library records' });
  }
};

// Get all library history 
exports.getLibraryByStudent = async (req, res) => {
  try {
    const libraryHistory = await LibraryHistory.find().populate('studentId').populate('bookTitle');

    if (!libraryHistory || libraryHistory == "") {
      res.status(400).json("libraryHistory by student is empty!...");
    }
    else {
      res.status(200).json(
        libraryHistory,
      );
    }
  } catch (error) {
    res.status(500).send('Server error : Failed to fetch library history');
  }
};


// Update library history record (Admin/Librarian only)
exports.updateLibraryRecord = async (req, res) => {
  console.log("Params ID:", req.params.id);  // Log the ID being passed
  console.log("Request Body:", req.body);    // Log the body of the request

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    // Find the document before updating
    const libraryHistoryExists = await LibraryHistory.findById(req.params.id);
    if (!libraryHistoryExists) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    // Update the document
    const libraryHistory = await LibraryHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Updated Library History:", libraryHistory);  // Log the updated record
    
    res.json(libraryHistory);
  } catch (error) {
    console.error("Update Error:", error);  // Log the error
    res.status(500).send('Server error');
  }
};



// Delete library history record (Admin/Librarian only)
exports.deleteLibraryRecord = async (req, res) => {
  try {
    const libraryHistory = await LibraryHistory.findByIdAndDelete(req.params.id);
    if (!libraryHistory) return res.status(404).json({ message: 'Record not found' });
    res.status(201).json({ message: "Record deleted Successfully!" });

  } catch (error) {
    res.status(500).send('Server error');
  }
}