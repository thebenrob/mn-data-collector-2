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
    var coinPrice = parseFloat($cells.eq(3).children('span').attr('title').replace(/[\$,%]/g, ''));
    var coinROI = parseFloat($cells.eq(7).children('strong').children('span').attr('title').replace(/[\$,%]/g, ''));
    var coinVolume = parseFloat($cells.eq(5).children('span').attr('title').replace(/[\$,%]/g, ''));
    var nodeCount = parseFloat($cells.eq(8).children('span').attr('title').replace(/[\$,%]/g, ''));
    var nodeWorth = parseFloat($cells.eq(10).children('span').attr('title').replace(/[\$,%]/g, ''));
    var volumeRatio = coinVolume / nodeWorth;
    
    var coinData = {name: coinName, 
                    price: coinPrice.toFixed(6),
                    roi: coinROI.toFixed(2),
                    nodes: nodeCount,
                    volume: coinVolume.toFixed(3),
                    worth: nodeWorth.toFixed(4),
                    ratio: volumeRatio.toFixed(4) };
    
    output.push(coinData);

  });

  res.render('index', { title: 'Coin Data', data: output});
});

module.exports = router;
