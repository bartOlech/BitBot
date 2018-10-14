const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const tradeController = require('../controllers/tradeController')

router.get('/', homeController.home);
router.post('/trade', tradeController.trade)

module.exports = router;

