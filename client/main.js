Meteor.call("quandl", function(error, result) {
  if (error)
      console.log(error)
  var response = JSON.parse(result.content);

  Session.set("quandlList", response);
});

Meteor.call("etfList", function(error, result) {
  if (error)
      console.log(error)

  Session.set("etfList", result);

  var tickers = _.map(result, function (x) {
    var ticks = x.split(' ');
      var data = {
       tick: ticks[0], 
       titles: x
      };
      return data;
    })  
  Session.set("tickers", tickers);
});


Template.etfs.helpers({
  tickers: function () {
    return Session.get("tickers");
  }
}); 
Template.quandl.helpers({
  quandlList: function () {
    return Session.get("quandlList");
  },
  moarData: function () {
    console.log("runngin code");
    var response = Session.get("quandlList");
    console.log("response.data", response.data); 
  }
}); 
