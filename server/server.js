  var cheerio =  Meteor.require('cheerio');

Meteor.methods({
    getTime: function () {
        result = Meteor.http.get("http://www.timeanddate.com/worldclock/city.html?n=136");
        $ = cheerio.load(result.content);
        CurrentTime = $('#ct').html();
        return CurrentTime;
    },
    etfList: function () {
      var arr = [];
      var badString = "List";
      result = Meteor.http.get("http://en.wikipedia.org/wiki/List_of_Canadian_exchange-traded_funds");
      $ = cheerio.load(result.content);
      var wikiData = $('#mw-content-text > ul:nth-child(n) > li:nth-child(n)');
      
      wikiData.map(function () {
        arr.push($(this).text())
      });

      var sorted = _.filter(arr, function(x) { 
        var ticker = x.split(' ');
        return ticker[0] != badString; 
      });
      return sorted; 
  },
  quandl: function () {
    // var url = "http://finance.yahoo.com/q/pm?s=" + ticker + ".TO"
    var url = "https://www.quandl.com/api/v1/datasets/YAHOO/TSX_ZEB_TO.json?auth_token=";
    var authKey = Meteor.settings.quandlKey;
    console.log("authKey", authKey);
    var response = Meteor.http.get( url + authKey );
    return response;
      
      // $ = cheerio.load(result.content);
      // var data = $('#yfncsumtab > tbody > tr:nth-child(2) > td:nth-child(1) > table.yfnc_datamodoutline1 > tbody > tr > td > table > tbody > tr:nth-child(1) > td.yfnc_datamoddata1').html();
      // return data;
    
  }  
});

