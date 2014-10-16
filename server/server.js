var cheerio =  Meteor.require('cheerio');

Meteor.methods({
    getTime: function () {
        result = Meteor.http.get("http://www.timeanddate.com/worldclock/city.html?n=136");
        $ = cheerio.load(result.content);
        CurrentTime = $('#ct').html();
        return CurrentTime;
    },
    etfTitles: function () {
        result = Meteor.http.get("http://en.wikipedia.org/wiki/List_of_Canadian_exchange-traded_funds");
        $ = cheerio.load(result.content);
        var arr = [];
        $('#mw-content-text > ul:nth-child(n) > li:nth-child(n)').map(function () {
          arr.push($(this).text())
        })
        console.log(arr)
        return arr; 
        // var winning = arr.map(function ( i ) {
        //   var singles = [];
        //   singles.push(i.split(','));
        //   return singles;
        // });
        // return winning;
    }
});

