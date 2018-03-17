var express = require('express');
var router = express.Router();
var fs = require('fs');
var coinList;

// Read list of coins from coinList.json
fs.readFile('./data/coinList.json', (err, data) => {
  if (err) throw err;  
  coinList = JSON.parse(data);
});

/* GET Coin List page*/
router.get('/', function(req, res, next) {

    res.render('coins', { title: 'Coin Data', coins: coinList });
}); // router.get('/')

// Get Add Coin page
router.get('/add', function(req, res, next) {

  res.render('add_coin', { title: 'Coin Data' });
}); // router.get('add)

// Post new Coin to the coin list
router.post('/add', function(req, res, next) {
  
  // add the new coin to the coin list
  coinList.push(req.body.name);

  // save coin list to coinList.json
  fs.writeFile('./data/coinList.json', JSON.stringify(coinList), (err) => {
    
    if (err) throw err;

    // Show the Coin List page with the new coin added
    res.render('coins', { title: 'Coin Data', coins: coinList });
  });
  
});

module.exports = router;