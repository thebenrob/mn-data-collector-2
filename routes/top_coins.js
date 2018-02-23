var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  fs.readFile('./cache/topCoins.cache', (err, data) => {
    if (err) throw err;
    var output = JSON.parse(data);

    res.render('topCoins', { title: '1000% Coins', data: output});
  
  }); // fs.readFile()

}); // router.get()

module.exports = router;