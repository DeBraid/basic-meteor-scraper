var cheerio =  Meteor.require('cheerio');

Meteor.methods({
    getTime: function () {
        result = Meteor.http.get("http://www.timeanddate.com/worldclock/city.html?n=136");
        $ = cheerio.load(result.content);
        CurrentTime = $('#ct').html();
        console.log("CurrentTime", CurrentTime);
        return CurrentTime;
    }
});