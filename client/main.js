
Meteor.call("getTime", function(error, result) {
  if (error)
      console.log(error)
  var time = "The current time is " + result;
  
  Session.set("currentTime", time);
});

// Meteor.call("etfTitles", function(error, result) {
//   if (error)
//       console.log(error)

//   Session.set("etfTitles", result);
// });

Meteor.call("etfTitles", function(error, result) {
  if (error)
      console.log(error)
    var badString = "List";

    var sorted = _.filter(result, function(x) { 
      
      var ticker = x.split(' ');

      return ticker[0] != badString; 
    });
    
  Session.set("etfTitles", sorted);
});

Template.etfs.helpers({
  etfTitles: function () {
    return Session.get("etfTitles");
  }
}); 

Template.whatTime.currTime = function (arg) {
  return Session.get("currentTime");
};

