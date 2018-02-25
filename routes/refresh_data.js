var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var coinList = require('../data/coinList');
var async = require('async');

/* GET refresh page*/
router.get('/', function(req, res, next) {

  // initialize URL
  var url = 'https://masternodes.online/?convert=BTC';

  // read the HTML
  request(url, function(error, response, html){

    if(!error){

      // intialize output arrays
      var output = [];
      var topCoins = [];

      // load HTML into Cheerio
      var $ = cheerio.load(html);

      $(coinList).each(function(index, coin){
    
        // Retrieve all the values
        var $cells = $('tr:contains("'+coin+'") td');
        var coinName = $cells.eq(2).text();
        var coinPrice = parseFloat($cells.eq(3).children('span').attr('title').replace(/[\$,%]/g, ''));
        var coinROI = parseFloat($cells.eq(7).children('strong').children('span').attr('title').replace(/[\$,%]/g, ''));
        var coinVolume = parseFloat($cells.eq(5).children('span').attr('title').replace(/[\$,%]/g, ''));
        var nodeCount = parseFloat($cells.eq(8).children('span').attr('title').replace(/[\$,%]/g, ''));
        var nodeWorth = parseFloat($cells.eq(10).children('span').attr('title').replace(/[\$,%]/g, ''));
        var volumeRatio = coinVolume / nodeWorth;
        
        // construct the coinData object with all values
        var coinData = {
          name: coinName, 
          price: coinPrice.toFixed(6),
          roi: coinROI.toFixed(2),
          nodes: nodeCount,
          volume: coinVolume.toFixed(3),
          worth: nodeWorth.toFixed(4),
          ratio: volumeRatio.toFixed(4) 
        };
        
        // push coinData onto the output arrays
        output.push(coinData);

        if(coinROI > 1000) {
          topCoins.push(coinData);
        }

      }) // coinList.each()

      // write coinData to cache
      async.parallel([
          function(callback){fs.writeFile('./cache/coinData.cache', JSON.stringify(output), callback)},
          function(callback){fs.writeFile('./cache/topCoins.cache', JSON.stringify(topCoins), callback)}
        ],
        function(err, results) {
           console.log('Something went wrong with the async-y stuff');
      });

      // render the home page
      res.redirect('/?refreshed_at=' + encodeURIComponent(new Date()));

    } // if(!error)

  }) // request()
  
});

module.exports = router;