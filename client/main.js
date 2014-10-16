Meteor.call("getTime", function(error, result) {
  if (error)
      console.log(error)
  var time = "The current time is " + result;
  
  Session.set("currentTime", time);
});

Meteor.call("etfTitles", function(error, result) {
  if (error)
      console.log(error)
  var title = result;

  Session.set("etfTitles", result);
});

Template.etfs.helpers({
  etfTitles: function () {
    return Session.get("etfTitles");
  }
}); 

Template.whatTime.currTime = function (arg) {
  return Session.get("currentTime");
};