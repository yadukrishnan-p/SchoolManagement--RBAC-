const express = require('express');
const { getLibraryByStudent, getLibraryRecords, addLibraryRecord, updateLibraryRecord, deleteLibraryRecord } = require('../Controllers/libraryController');
const { verifyToken } = require('../MiddleWare/authMiddleware');
const { authorize } = require('../MiddleWare/roleMiddleware');
const { CreateEmployee, GetAllEmployee, UpdateEmployee, DeleteEmployee } = require('../Controllers/EmployeeController');
const router = express.Router();

// manage library
router.get('/library', verifyToken, authorize(['librarian', 'admin']), getLibraryByStudent);
router.get('/libraryRecords', verifyToken, authorize(['librarian', 'office_staff', 'admin']), getLibraryRecords)
router.post('/library', verifyToken, authorize(['admin', 'librarian']), addLibraryRecord);
router.put('/library/:id', verifyToken, authorize(['admin', 'librarian']),updateLibraryRecord);
router.delete('/library/:id', verifyToken, authorize(['admin', 'librarian']), deleteLibraryRecord);

// manage staff (admin, office_staff,Librarian)
router.post('/employee',verifyToken, authorize('admin'),CreateEmployee);
router.get('/employee',verifyToken, authorize('admin'),GetAllEmployee);
router.put('/employee/:id',verifyToken, authorize('admin'),UpdateEmployee);
router.delete('/employee/:id',verifyToken, authorize('admin'),DeleteEmployee);

module.exports = router;
