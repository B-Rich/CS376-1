//Constants
var width = 320;
	height = 356, //356
	margin = {top: 20, right: 10, bottom: 20, left: 10},
	formh = height-margin.top-margin.bottom,
	formw = width-margin.right-margin.left,
	submith = 36 + 10,
	texth = 96,
	totalh = texth + submith,
	cdiameter = 70,
	radius = Math.min(width, height) / 2,
    color = d3.scale.category20c();
var tags = ["tag1", "tag2", "tag3"];

//Setup
d3.select("rect")
	.attr("x", margin.left)
	.attr("y", height/2 - totalh/2)
	.attr("width", formw)
	.attr("height", texth)
	.attr("fill", "grey")
	.attr("rx", 10)
	.attr("ry", 10);	
d3.select("#formobject")
	.attr("x", margin.left)
	.attr("y", height/2 - totalh/2)
	.attr("width", formw)
	.attr("height", 356);
d3.select("#note")
	.style("height", function(){return texth + "px";});
	
	
//Variables
var note; //the text area content
var drag = d3.behavior.drag()
	.origin(Object)
	.on("drag", dragmove);
// var partition = d3.layout.partition()
//     .sort(null)
//     .size([2 * Math.PI, radius * radius])
//     .value(function(d) { return 1; });
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return 1; });

function handleClick(event){
	note = document.getElementById("note").value;
	console.log(note);
    transition();	
    return false;
}

function transition(){
	
	//Resize, fade, and remove form
    d3.select("#note")
		.transition()
		.duration(500)
			.style("border-radius", "80px")
			.style("background", "grey")
			.style("opacity", 0);
	d3.select("#submit")
		.transition()
		.duration(500)
			.style("opacity", 0);
	d3.select("#formobject")
		.transition()
		.delay(500)
		.remove();
		
	//Tween hidden rectangle to circle
	var rect = d3.select("rect")
		.data([{x:(width/2) - (cdiameter/2), y:(height/2) - (cdiameter/2)}])
		.attr("rx", 60)
		.attr("ry", 60)
		.call(drag);
	rect.transition()
		.delay(100)
		.duration(1000)
			.attr("width", cdiameter)
			.attr("height", cdiameter)
			.attr("x", (width/2) - (cdiameter/2))
			.attr("y", (height/2) - (cdiameter/2));
	
	//Generate Sunburst
	var svg = d3.select("svg")
		.insert("g", "rect")
		    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var g = svg.selectAll(".arc")
      .data(pie(tags))
    .enter().append("g")
      .attr("class", "arc");
	g.append("path")
      .attr("d", arc)
      .style("fill", function(d, i) { return color(i); });
}

function dragmove(d) {
	console.log("drag event");
	console.log(d);
	console.log(d3.event);
	d3.select(this)
		.attr("x", d.x = Math.max(0, Math.min(width - 44, d3.event.x)))
		.attr("y", d.y = Math.max(0, Math.min(height - 44, d3.event.y)));
}