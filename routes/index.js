var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  var refreshed;

  if(req.query.refreshed_at) {
    
    refreshed = decodeURIComponent(req.query.refreshed_at);
  }

  fs.readFile('./cache/coinData.cache', (err, data) => {
    
    if (err) throw err;
    
    var output = JSON.parse(data);

    if(refreshed) {

      res.render('index', { title: 'Coin Data', data: output, refresh: refreshed });

    } else {

      res.render('index', { title: 'Coin Data', data: output });

    } // if refreshed

  }); // fs.readFile()

}); // router.get()

module.exports = router;
