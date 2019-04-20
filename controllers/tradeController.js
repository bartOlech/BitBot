const request = require('request');
const crypto = require('crypto');
const {
  check,
  validationResult
} = require('express-validator/check');
const conf = require('../config/api');

const apiKey = conf.apiKey;
const apiSecret = conf.apiSecret;

exports.validate = [
  check('quantity').trim().isLength({
    min: 1
  }).withMessage('Quantity is required!'),

];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('home', {
      validated: req.body,
      errors: errors.mapped(),
      message: ''
    })
  }
  next()
};

exports.trade = (req, res) => {

  var verb = 'POST',
    path = '/api/v1/order',
    expires = new Date().getTime() + (60 * 1000), // 1 min in the future
    data = {
      symbol: "XBTUSD",
      orderQty: req.body.quantity,
      price: req.body.limitPrice ? req.body.limitPrice : null,
      ordType: req.body.tradeType,
      side: req.body.buySell,
      stopPx: req.body.stopPrice ? req.body.stopPrice : null,
    };

  const postBody = JSON.stringify(data);

  const signature = crypto.createHmac('sha256', apiSecret).update(verb + path + expires + postBody).digest('hex');

  const headers = {
    'content-type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature
  };

  const requestOptions = {
    headers: headers,
    url: 'https://testnet.bitmex.com' + path,
    method: verb,
    body: postBody
  };
  request(requestOptions, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    //console.log(body.orderID);
  });
  res.redirect('/')
}