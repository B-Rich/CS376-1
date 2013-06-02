//Constants
var width = 320;
var height = 356; //356
var margin = {top: 20, right: 10, bottom: 20, left: 10};
var formh = height-margin.top-margin.bottom;
var formw = width-margin.right-margin.left;
var submith = 36 + 10;
var texth = 96;
var totalh = texth + submith;
var cdiameter = 70;
var radius = (Math.max(width, height) + 200) / 2;
var color = d3.scale.category20c();
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
    .outerRadius(radius)
    .innerRadius(80);
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
		.attr("class", "arc")
		.style("opacity", 0);
	g.append("path")
		.attr("d", arc)
		.style("fill", function(d, i) { return color(i); });
	g.append("text")
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function(d) { return d.data; });
	g.transition()
		.delay(1500)
		.duration(1000)
		.style("opacity", 100);
			
}

function dragmove(d) {
	console.log("drag event");
	console.log(d);
	console.log(d3.event);
	d3.select(this)
		.attr("x", d.x = Math.max(0, Math.min(width - 44, d3.event.x)))
		.attr("y", d.y = Math.max(0, Math.min(height - 44, d3.event.y)));
}