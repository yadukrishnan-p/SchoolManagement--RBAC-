const express = require('express');
const { verifyToken } = require('../MiddleWare/authMiddleware');
const { authorize } = require('../MiddleWare/roleMiddleware');
const { createStudent, getAllStudents, updateStudent, deleteStudent } = require('../Controllers/studentController');

const router = express.Router();

// Admin and Office Staff can create students
router.post('/create', verifyToken, authorize(['admin', 'office_staff']), createStudent);

// Admin, Office Staff, Librarian can view students
router.get('/view-details', verifyToken, authorize(['admin', 'office_staff', 'librarian']), getAllStudents);

router.put('/update/:id', verifyToken, authorize(['admin', 'office_staff']), updateStudent);
router.delete('/delete/:id',verifyToken, authorize(['admin', 'office_staff']), deleteStudent);
module.exports = router;
