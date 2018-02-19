var express = require('express');
var router = express.Router();
var fs = require('fs');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {

  var output = [];

  var contents = fs.readFileSync('./cache/masternodes.online.html', 'utf8'); 
  var $ = cheerio.load(contents);    
  
  var coins = ['END', 'NIHL', 'IFX', 'ZOC', 'NYXCOIN', 'CTF', 'CROP', 'ARGO', 'XAR',
               'RACE', 'QBIC', 'CBS', 'ESCO', 'SAROS', 'NMS', 'YI', 'CARAT', 'VTAR' 
              ];
  $(coins).each(function(index, coin){
    
    var $cells = $('tr:contains("'+coin+'") td');
    var coinName = $cells.eq(2).text();
    var coinPrice = $cells.eq(3).children('span').attr('title');
    var coinROI = $cells.eq(7).children('strong').children('span').attr('title');
    var coinVolume = $cells.eq(5).children('span').attr('title');
    var nodeCount = $cells.eq(8).children('span').attr('title');
    var nodeWorth = $cells.eq(10).children('span').attr('title');
    
    var coinData = {name: coinName, 
                    price: coinPrice,
                    roi: coinROI,
                    nodes: nodeCount,
                    volume: coinVolume,
                    worth: nodeWorth };
    
    output.push(coinData);

  });

  res.render('index', { title: 'Coin Data', data: output});
});

module.exports = router;
