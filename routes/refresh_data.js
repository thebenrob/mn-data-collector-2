var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

/* GET refresh page*/
router.get('/', function(req, res, next) {

  var url = 'https://masternodes.online/?convert=BTC';

  request(url, function(error, response, html){

    if(!error){
    
      fs.writeFile('masternodes.online.html', html, function(err){
        
        if (!err) {

          res.render('refresh', { title: 'Coin Data' , time: new Date()});

        } // if(!err)
        
      }) // writeFile()

    } // if(!error)

  }) // request()

  
});

module.exports = router;