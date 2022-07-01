const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report-controller');

router.get('/', ReportController.getAllReports);
router.get('/actives', ReportController.getActiveReports);
router.get('/:id_report', ReportController.getSpecificReport);
router.post('/', ReportController.postInsertReport);

module.exports = router;