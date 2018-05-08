var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var coinList = require('../data/coinList');

/* GET refresh page*/
router.get('/', function(req, res, next) {

  // initialize URL
  var url = 'https://masternodes.online/?convert=BTC#masternode-stats';

  // read the HTML
  request(url, function(error, response, html){

    if(!error){

      // intialize output arrays
      var output = [];

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
        var requiredCoins = parseFloat($cells.eq(9).children('span').attr('title').replace(/[\$,%]/g, ''));
        var volumeRatio = coinVolume / nodeWorth;
        var dailyPayout = coinPrice * requiredCoins * coinROI / 365 / 100;
        
        // Keep track of progress in the console
        console.log(coinName);

        // construct the coinData object with all values
        var coinData = {
          name: coinName, 
          price: coinPrice.toFixed(6),
          roi: coinROI.toFixed(2),
          nodes: nodeCount,
          volume: coinVolume.toFixed(3),
          worth: nodeWorth.toFixed(4),
          ratio: volumeRatio.toFixed(4),
          payout: dailyPayout.toFixed(6)
        };
        
        // push coinData onto the output arrays
        output.push(coinData);

      }) // coinList.each()

      fs.writeFile('./cache/coinData.json', JSON.stringify(output), (err) => {
        res.redirect('/?refreshed_at=' + encodeURIComponent(new Date()));
      });

    } // if(!error)

  }) // request()
  
});

module.exports = router;