# MN Data Collector 2.0

MN Data Collector is an Express app designed to retrieve data about a list of Masternode Coins you're interested in and display them on a page.  I usually just copy/paste it into a spreadsheet.

1. Run `npm install`
1. Run `mkdir cache`
1. Run `mkdir data` 
1. Run `npm start`
1. Browse to [localhost:3000/refresh/](http://localhost:3000/refresh) - this will grab the latest data and redirect you to [/](http://localhost:3000)

Use the [Refresh](http://localhost:3000/refresh/) link to refresh the cache.  Use the [Long Form](http://localhost:3000/longform) view to see it in a giant table row.