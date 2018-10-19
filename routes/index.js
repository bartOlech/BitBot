const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const tradeController = require('../controllers/tradeController');
const leverageController = require('../controllers/leverageController');
const userInfoController = require('../controllers/userInfoController');


router.post('/trade',
    userInfoController.userInfo,
    leverageController.leverage,
    tradeController.trade
    );

router.get('/', homeController.home
    );
module.exports = router;

