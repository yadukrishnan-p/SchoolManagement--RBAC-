const mongoose = require('mongoose');

const FeesSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming studentId references another model (Student)
    ref: 'Student', // Reference to the student model (adjust as necessary)
    required: false
  },
  feeType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentDate: {
    type: Date,
    required: true
  },
  remarks: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const FeesModel = mongoose.model('Fees', FeesSchema);

module.exports = FeesModel;
