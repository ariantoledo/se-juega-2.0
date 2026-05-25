const express = require('express');
const router = express.Router();
const canchasController = require('../controllers/canchasController');

router.get('/', canchasController.getCanchas);
router.post('/', canchasController.createCancha);

module.exports = router;
