# MN Data Collector 2.0

This is implemented as an Express App with crappy html views instead of console stuff.

1. Run `npm install`
2. Open /routes/index.js to change the coins you're looking for (line 14)
3. Run `npm start`
4. Browse to http://localhost:3000/refresh
5. Follow the link to [View Data](http://localhost:3000/)

Right now, this is implemented as two separate actions because the request example I followed used an async action, and I haven't yet figured out how to wait for the async stuff to complete in order to render the views correctly.