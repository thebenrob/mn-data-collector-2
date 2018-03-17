var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  fs.readFile('./cache/coinData.json', (err, data) => {
    if (err) throw err;
    var output = JSON.parse(data);

    res.render('longForm', { title: 'Coin Data', data: output});
  
  }); // fs.readFile()

}); // router.get()

module.exports = router;