# MN Data Collector 2.0

MN Data Collector is an Express app designed to retrieve data about a list of Masternode Coins you're interested in and display them on a page.  I usually just copy/paste it into a spreadsheet.

1. Run `npm install`
1. Run `mkdir cache`
1. Run `mkdir data`
1. Run `touch ./data/coinList.json`
1. Add your first coin to `coinList.json` in the form of a JavaScript array (example `["Magnet"]`) 
1. Run `npm start`
1. Browse to [localhost:3000/refresh/](http://localhost:3000/refresh) - this will grab the latest data and redirect you to [/](http://localhost:3000)

To add more coins, go to [Add Coins](http://localhost:3000/coins/add) or click [Coin List](http://localhost:3000/coins) in the top nav, then use the [Add Coins](http://localhost:3000/coins/add) link.

Use the [Refresh](http://localhost:3000/refresh/) link to refresh the cache.

Click [View Longform](http://localhost:3000/longform) in the nav to see the coindata in a giant table row, suitable for copy/pasting into spreadsheets.