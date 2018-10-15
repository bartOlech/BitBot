const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const tradeController = require('../controllers/tradeController');
const leverageController = require('../controllers/leverageController');

router.get('/', homeController.home);
router.post('/trade',
    leverageController.leverage,
    tradeController.trade)

module.exports = router;

