const FeesHistory = require('../model/feeModel');


exports.addFeesRecord = async (req, res) => {
  const { feeType, amount, paymentDate, remarks } = req.body;
  try {
    const feesHistory = new FeesHistory({  feeType, amount, paymentDate, remarks });
    await feesHistory.save();
    if (!feesHistory) {
      res.status(400).json({
      message: 'Failed to add fees record',
      error: error.message
    });
    }
    res.status(201).json({
      data:feesHistory,
      message: "fees record successfully added!"
    });
  } catch (error) {
  
     res.status(500).json({
      message: 'Failed to add fees record',
      error: error.message
  })
}
};
// Get fees history
exports.getFeesHistory = async (req, res) => {
  try {
      const feesHistory = await FeesHistory.find(); // Assuming you have a FeesHistory model
      return  (feesHistory) ? res.status(200).json({ success: true, message: feesHistory}) : res.status(401).json("Fees History not found!")
     
  } catch (error) {
      res.status(500).json({ message: 'Error fetching fees history' });
  }
};


// Get fees history 
exports.getFeesByStudent = async (req, res) => {
  try {
    const feesHistory = await FeesHistory.find().populate('studentId', 'name');;
    console.log("feeshistory", feesHistory);
    if (feesHistory == "") {
      res.status(400).json('No fees History! ');
    }
    res.json(feesHistory);
  } catch (error) {
    res.status(500).send('Server error'); 
  }
};

// Update fees history record
exports.updateFeesRecord = async (req, res) => {
  try {
    const feesHistory = await FeesHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feesHistory) return res.status(404).json({ message: 'Record not found' });
    res.json(feesHistory);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete fees history record (Admin only)
exports.deleteFeesRecord = async (req, res) => {
  try {
    const feesHistory = await FeesHistory.findByIdAndDelete(req.params.id);
    if (!feesHistory) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Fees record deleted' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
