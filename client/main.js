Meteor.call("getTime", function(error, result) {
  if (error)
      console.log(error)
  var time = "The current time is " + result;
  
  Session.set("currentTime", time);
});

Template.whatTime.currTime = function (arg) {
  return Session.get("currentTime");
};