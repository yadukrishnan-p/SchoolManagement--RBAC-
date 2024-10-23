const express = require('express');
const { getFeesByStudent, addFeesRecord, getFeesHistory, updateFeesRecord, deleteFeesRecord } = require('../Controllers/feesController');
const { verifyToken } = require('../MiddleWare/authMiddleware');
const { authorize } = require('../MiddleWare/roleMiddleware');
const router = express.Router();



// get fee by student
router.get('/fees', verifyToken, authorize(['office_staff', 'admin']), getFeesByStudent);
router.post('/fees', verifyToken, authorize(['office_staff', 'admin']), addFeesRecord);
router.put('/fees/:id', verifyToken, authorize(['office_staff', 'admin']), updateFeesRecord);
router.delete('/fees/:id', verifyToken, authorize(['office_staff', 'admin']), deleteFeesRecord);
router.get('/ViewFeeHistory', verifyToken, authorize(['office_staff', 'admin']), getFeesHistory);

module.exports = router;
