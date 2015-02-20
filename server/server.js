var cheerio =  Meteor.require('cheerio');

Meteor.methods({
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
    var url = "https://www.quandl.com/api/v1/datasets/YAHOO/TSX_ZEB_TO.json?auth_token=";
    var authKey = Meteor.settings.quandlKey;
    var response = Meteor.http.get( url + authKey );
    return response;
  }  
});

