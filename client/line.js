var Points = new Meteor.Collection(null);
if(Points.find({}).count() === 0){
  for(i = 0; i < 20; i++)
    Points.insert({
      date:moment().startOf('day').subtract(Math.floor(Math.random() * 1000), 'days').toDate(),
      value:Math.floor(Math.random() * 100)+500
    });
}

Template.lineChart.events({
  'click #add':function(){
    Points.insert({
      date:moment().startOf('day').subtract(Math.floor(Math.random() * 1000), 'days').toDate(),
      value:Math.floor(Math.random() * 100)+500
    });
  },
  'click #remove':function(){
    var toRemove = Random.choice(Points.find().fetch());
    Points.remove({_id:toRemove._id});
  },
  'click #randomize':function(){
    //loop through bars
    Points.find({}).forEach(function(point){
      Points.update({_id:point._id},{$set:{value:Math.floor(Math.random() * 100)+500}});
    });
  }
});


Template.lineChart.rendered = function(){
  //Width and height
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // data format: "2015-01-30"
  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.value);
    });

  var svg = d3.select("#lineChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

  svg.append("g")
    .attr("class", "y axis")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

  Deps.autorun(function(){
    var response = Session.get("quandlList");
    var dataset = [];

    if (!response) {
      Meteor.defer(function () {
        var response = Session.get("quandlList");
        console.log("Meteor defer is running")
        var respData = response.data;
        return respData
      })
      return respData
    }
    // console.log("respData", respData);
    var respData = response.data;
    
    _.map( respData , function (item, index) {
      if ( index < 50 ) {
        var parseDate = d3.time.format("%Y-%m-%d").parse;
        var myDate = parseDate(item[0]);
        console.log(myDate);
        dataset.push({
          date : myDate,
          value : item[1],
        });
        console.log("item:", item[0], typeof(item[1]));
      }
    });

    var paths = svg.selectAll("path.line")
      .data([dataset]); //todo - odd syntax here - should use a key function, but can't seem to get that working

    x.domain(d3.extent(dataset, function(d) { return d.date; }));
    y.domain(d3.extent(dataset, function(d) { return d.value; }));

    //Update X axis
    svg.select(".x.axis")
      .transition()
      .duration(1000)
      .call(xAxis);
      
    //Update Y axis
    svg.select(".y.axis")
      .transition()
      .duration(1000)
      .call(yAxis);
    
    paths
      .enter()
      .append("path")
      .attr("class", "line")
      .attr('d', line);

    paths
      .attr('d', line); //todo - should be a transisition, but removed it due to absence of key
      
    paths
      .exit()
      .remove();
  });
};