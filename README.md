# MN Data Collector 2.0

MN Data Collector is an Express app designed to retrieve data about a list of Masternode Coins you're interested in and display them on a page.  What I do with it is c/p into my coin spreadsheet.

1. Run `npm install`
2. Run `mkdir cache`
3. Open /data/coinList.js file to modify coins you're looking for
4. Run `npm start`
5. Browse to [localhost:3000/refresh/](http://localhost:3000/refresh/) to cache the MN data
6. Click [Home](http://localhost:3000/) or browse to [localhost:3000](http://localhost:3000/) to view the data

When you first load, you'll be looking at cached data.  Use the [Refresh](http://localhost:3000/refresh/) link to refresh the cache.  Use the [Long Form](http://localhost:3000/longform) view to see it in a giant table row (suitable for c/p).