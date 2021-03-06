const request = require('request');
const crypto = require('crypto');
const conf = require('../config/api');

const apiKey = conf.apiKey;
const apiSecret = conf.apiSecret;

exports.leverage = (req, res, next) => {

  var verb = 'POST',
    path = '/api/v1/position/leverage',
    expires = new Date().getTime() + (60 * 1000), // 1 min in the future
    data = {
      symbol: "XBTUSD",
      leverage: req.body.slctLeverage
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
  });
  next()

}