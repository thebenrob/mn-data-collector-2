# MN Data Collector 2.0

MN Data Collector is an Express app designed to retrieve data about a list of Masternode Coins you're interested in and display them on a page.  I usually just copy/paste it into a spreadsheet.

1. Run `npm install`
2. Run `mkdir cache`
3. Open /data/coinList.js file to modify coins you're looking for
4. Run `npm start`
6. Browse to [localhost:3000/refresh/](http://localhost:3000/refresh) - this will grab the latest data and redirect you to [/](http://localhost:3000)

Use the [Refresh](http://localhost:3000/refresh/) link to refresh the cache.  Use the [Long Form](http://localhost:3000/longform) view to see it in a giant table row.