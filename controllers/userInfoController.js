const request = require('request');
const crypto = require('crypto');
const conf = require('../config/api');

const apiKey = conf.apiKey;
const apiSecret = conf.apiSecret;

exports.userInfo = (req, res, next)=>{

var verb = 'GET',
  path = '/api/v1/position',
  expires = new Date().getTime() + (60 * 1000), // 1 min in the future
  data = {
};

const postBody = JSON.stringify(data);

const signature = crypto.createHmac('sha256', apiSecret).update(verb + path + expires + postBody).digest('hex');

const headers = {
    'content-type' : 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature
  };

const requestOptions = {
    headers: headers,
    url:'https://testnet.bitmex.com'+path,
    method: verb,
    body: postBody
  };

    request(requestOptions, (error, response, body)=> {
        if (error) { console.log(error); }
        const arr = JSON.parse(body)
        //console.log(arr[0].account);
        req.flash('price', `${arr[0].markPrice}`)
        req.flash('coin', `${arr[0].symbol}`)
        next()
        });
}