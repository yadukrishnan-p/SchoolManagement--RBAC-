const Student = require('../model/StudentModel');

exports.createStudent = async (req, res) => {
  try {
    const { name, class: studentClass, rollNo, age } = req.body;


    const normalizedRollNo = rollNo.toLowerCase();

 
    const existingStudent = await Student.findOne({ rollNo: normalizedRollNo });
    console.log("rollNo:", normalizedRollNo);
    console.log("existingStudent:", existingStudent);

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Student with this roll number already exists!"
      });
    }

    // Create 
    let newStudent = await Student.create({ 
      name, 
      class: studentClass, 
      rollNo: normalizedRollNo, 
      age 
    });

    
    if (newStudent) {
      return res.status(201).json({
        success: true,
        message: "Student created successfully!",
        newStudent
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Error occurred while creating student'
      });
    }

  } catch (err) {
    // MongoDB duplicate key error code (11000)
    if (err.code === 11000 && err.keyPattern && err.keyPattern.rollNo) {
      return res.status(409).json({
        success: false,
        message: 'Student with this roll number already exists!'
      });
    }

   
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};


// View all students (Admin, Office Staff, Librarian)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Update student details (Admin/Staff only)
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete a student (Admin only)
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ success: true,message: 'Student deleted' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
