const request = require('request');
const crypto = require('crypto');

const apiKey = "xa3truWVgi6moOLAJfDcV73H";
const apiSecret = "Bi1m0Ihyzb3x_QyLdoLW1u_ZVkpSjXRunU8M3edSlqxBrPys";

exports.trade = (req, res)=>{

    const verb = 'POST',
  path = '/api/v1/order',
  expires = new Date().getTime() + (60 * 1000), // 1 min in the future
  data = {symbol:"XBTUSD",orderQty:1,price:590,ordType:"Limit"};

const postBody = JSON.stringify(data);

const signature = crypto.createHmac('sha256', apiSecret).update(verb + path + expires + postBody).digest('hex');

var headers = {
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
        console.log(body);
      });
      res.redirect('/')

}