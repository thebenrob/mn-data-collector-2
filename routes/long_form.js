var express = require('express');
var router = express.Router();
var fs = require('fs');
var cheerio = require('cheerio');
var coinList = require('../data/coinList');

/* GET home page. */
router.get('/', function(req, res, next) {

  var output = [];

  var contents = fs.readFileSync('./cache/masternodes.online.html', 'utf8'); 
  var $ = cheerio.load(contents);    
  
  $(coinList).each(function(index, coin){
    
    var $cells = $('tr:contains("'+coin+'") td');
    var coinName = $cells.eq(2).text();
    var coinPrice = $cells.eq(3).children('span').attr('title');
    //coinPrice = parseFloat(coinPrice.replace(/[\$,%]/g, ''));
    var coinROI = $cells.eq(7).children('strong').children('span').attr('title');
    var coinVolume = $cells.eq(5).children('span').attr('title');
    var nodeCount = $cells.eq(8).children('span').attr('title');
    var nodeWorth = $cells.eq(10).children('span').attr('title');
    var volumeRatio = parseFloat(coinVolume.replace(/[\$,%]/g, ''))/parseFloat(nodeWorth.replace(/[\$,%]/g, ''));
    
    var coinData = {name: coinName, 
                    price: coinPrice,
                    roi: coinROI,
                    nodes: nodeCount,
                    volume: coinVolume,
                    worth: nodeWorth,
                    ratio: volumeRatio };
    
    output.push(coinData);

  });

  res.render('longForm', { title: 'Coin Data', data: output});
});

module.exports = router;