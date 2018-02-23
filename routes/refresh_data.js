var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var coinList = require('../data/coinList');
var async = require('async');

/* GET refresh page*/
router.get('/', function(req, res, next) {

  var url = 'https://masternodes.online/?convert=BTC';

  request(url, function(error, response, html){

    if(!error){

      var output = [];
      var topCoins = [];
      var $ = cheerio.load(html);

      $(coinList).each(function(index, coin){
    
        var $cells = $('tr:contains("'+coin+'") td');
        var coinName = $cells.eq(2).text();
        var coinPrice = parseFloat($cells.eq(3).children('span').attr('title').replace(/[\$,%]/g, ''));
        var coinROI = parseFloat($cells.eq(7).children('strong').children('span').attr('title').replace(/[\$,%]/g, ''));
        var coinVolume = parseFloat($cells.eq(5).children('span').attr('title').replace(/[\$,%]/g, ''));
        var nodeCount = parseFloat($cells.eq(8).children('span').attr('title').replace(/[\$,%]/g, ''));
        var nodeWorth = parseFloat($cells.eq(10).children('span').attr('title').replace(/[\$,%]/g, ''));
        var volumeRatio = coinVolume / nodeWorth;
        
        var coinData = {
          name: coinName, 
          price: coinPrice.toFixed(6),
          roi: coinROI.toFixed(2),
          nodes: nodeCount,
          volume: coinVolume.toFixed(3),
          worth: nodeWorth.toFixed(4),
          ratio: volumeRatio.toFixed(4) 
        };
        
        output.push(coinData);

        if(coinROI > 1000) {
          topCoins.push(coinData);
        }

      }) // coinList.each()

      // TODO
      // Write the topCoins to the topCoins.cache

      async.parallel([
          function(callback){fs.writeFile('./cache/coinData.cache', JSON.stringify(output), callback)},
          function(callback){fs.writeFile('./cache/topCoins.cache', JSON.stringify(topCoins), callback)}
        ],
        function(err, results) {
           console.log('Something went wrong with the async-y stuff');
      });
      // fs.writeFile('./cache/coinData.cache', JSON.stringify(output), function(err){
          
      //   if (!err) {

      //     // res.render('refresh', { title: 'Coin Data' , time: new Date()});
      //     res.redirect('/?refreshed_at=' + encodeURIComponent(new Date()));

      //   } // if(!err)
        
      // }) // writeFile()

      res.redirect('/?refreshed_at=' + encodeURIComponent(new Date()));

    } // if(!error)

  }) // request()
  
});

module.exports = router;