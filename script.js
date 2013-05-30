var svg = d3.select("#container")[0][0];
var width = svg.clientWidth;
var height = svg.clientHeight;
var x = width/2 - 100;
var y = height/2 - 80; //moved up by 5
// console.log(x + " " + y);
d3.select("rect")
	.attr("x", x)
	.attr("y", y);
d3.select("#formobject")
	.attr("x", x)
	.attr("y", y);
var note;
var drag = d3.behavior.drag()
	.origin(Object)
	.on("drag", dragmove);

function handleClick(event){
    console.log(document.getElementById("note").value);
    transition(document.getElementById("note").value);
    return false;
}

function transition(val){
	note = val;
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
		.delay(600)
		.remove();
	var rect = d3.select("rect")
		.data([{x:x + 78, y:y+58}])
		.attr("rx", 60)
		.attr("ry", 60)
		.call(drag);
	rect.transition()
		.delay(600)
		.duration(1000)
			.attr("width", "44px")
			.attr("height", "44px")
			.attr("x", x + 78)
			.attr("y", y + 58);
}

function dragmove(d) {
	console.log("drag event");
	console.log(d);
	console.log(d3.event);
	d3.select(this)
		.attr("x", d.x = Math.max(0, Math.min(width - 44, d3.event.x)))
		.attr("y", d.y = Math.max(0, Math.min(height - 44, d3.event.y)));
}