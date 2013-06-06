//Constants
var width = Math.min(window.screen.availWidth, 1000); //320
var height = Math.min(window.screen.availHeight, 1400); //356
var margin = {top: 20, right: 10, bottom: 20, left: 10};
var formh = height-margin.top-margin.bottom;
// var formw = Math.min(width-margin.right-margin.left, 400);
var formw = width-margin.right-margin.left;
var submith = 36 + 10;
var texth = 96;
var totalh = texth + submith;
var cdiameter = 70;
var radius = Math.max(width, height);
var color = d3.scale.category20c();
var tags = ["polarbear dog", "lion turtle", "turtle duck", "eel hound", "koala otter"];
var drag = d3.behavior.drag()
	.origin(Object)
	.on("drag", dragmove)
	.on("dragend", dragend);
var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(80);
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return 1; });

//Setup
d3.select("svg")
	.attr("width", width)
	.attr("height", height);
d3.select("#container")
	.style("width", function(){return width + "px";})
	.style("height", function(){return height + "px";});
d3.select("rect")
	.attr("x", margin.left)
	.attr("y", height/2 - totalh/2)
	.attr("width", formw)
	.attr("height", texth)
	.attr("fill", "grey")
	.attr("rx", 10)
	.attr("ry", 10)
	.attr("id", "draggable");	
d3.select("#formobject")
	.attr("x", margin.left)
	.attr("y", height/2 - totalh/2)
	.attr("width", formw)
	.attr("height", 356);
d3.select("#note")
	.style("height", function(){return texth + "px";})
	.style("width", function(){return formw-6 + "px";});
	
	
//Variables
var note; //the text area content
//var tag; //the selected tag
var dragdx = 0;
var dragdy = 0;

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
	var g = svg.selectAll(".sunburst")
		.data(pie(tags))
    .enter().append("g")
		.style("opacity", 0);
	g.append("path")
		.attr("class", "arc")
		.attr("d", arc)
		.style("fill", function(d, i) { return color(i); });
	g.append("text")
		.attr("transform", function(d) { 
			var angle = ((180*(d.startAngle+d.endAngle)/2)/Math.PI)-90;
			var newy = arc.centroid(d)[1]/2;
			var newx = arc.centroid(d)[0]/2;
			return "translate("+[newx, newy]+")rotate("+angle+")rotate("+(angle>90?-180:0)+")"; 
		})
		.attr("text-anchor", "start")
		.attr("dy", "-.2em")
		.style("text-anchor", "middle")
		.text(function(d) { return d.data; });
	g.transition()
		.delay(1500)
		.duration(1000)
		.style("opacity", 100);			
}

function dragmove(d) {
	// console.log("drag event");
	// console.log(d);
	// console.log(d3.event);
	dragdx += d3.event.dx;
	dragdy += d3.event.dy;
	d3.select(this)
		.attr("x", d.x = Math.max(0, Math.min(width - cdiameter, d3.event.x)))
		.attr("y", d.y = Math.max(0, Math.min(height - cdiameter, d3.event.y)));
}

function dragend(d) {
	// console.log("drag end");
	console.log(d);
	console.log(d3.event);
	// console.log(dragdx+", "+dragdy);
	// TO DO: set tag
	var direction = Math.min(Math.abs(dragdx), Math.abs(dragdy));
	console.log("d.x,d.y: "+d.x+", "+d.y);
	console.log("event.x,event.y: "+d3.event.sourceEvent.x+", "+d3.event.sourceEvent.y);
	console.log(d3.mouse(this));
	// console.log(d3.touches("svg"));
	// console.log(d3.touches("html"));
	// console.log(d3.touches("rect"));
	// console.log(d3.touches("this"));
	// var eventx = d3.mouse(this)[0] ? d3.mouse(this)[0] : d.x;
	// var eventy = d3.mouse(this)[1] ? d3.mouse(this)[1] : d.y;
	//eventx += ((window.screen.availWidth - width)/2);
	// var eventx = d3.mouse(this)[0] + ((window.screen.availWidth - width)/2); 
	// var eventy = d3.mouse(this)[1];
	// console.log("eventX: "+eventx);
	// console.log("eventY: "+eventy);	
	d3.select(this).transition()
		.duration(3000)
		.ease("cubic-out")
		// .attr("x", d.x += Math.min((width/8) * (dragdx/direction), 0))
		// .attr("y", d.y += Math.min((height/8) * (dragdy/direction), 0));
		.attr("x", d.x += 0)
		.attr("y", d.y += 0);
	//console.log(Math.min((width/5) * (dragdx/direction), width/3) + ", " + Math.min((width/5) * (dragdy/direction), width/3));
<<<<<<< HEAD
	//console.log(d3.select(document.elementFromPoint(eventx+40, eventy+40)));
	//console.log(document.elementFromPoint(eventx+40, eventy+40));
=======
	tag = d3.select(document.elementFromPoint(d3.event.sourceEvent.x+40, d3.event.sourceEvent.y+40))[0][0].__data__.data;
	 console.log(tag);
	// console.log((width/5) * (dragdx/direction)+", "+(height/5) * (dragdy/direction));
	// console.log(Math.min((width/5) * (dragdx/direction), width/4)+", "+Math.min((height/5) * (dragdy/direction), height/4));
>>>>>>> d4fb463465b65c96d6f676331a56b9560ec6bd3d
	dragdx = 0;
	dragdy = 0;
	//tag = d3.select(document.elementFromPoint(eventx+40, eventy+40))[0][0].__data__.data;
	//console.log(tag);
	var tag = d3.select(document.elementFromPoint(d.y, d.x));
	console.log(tag);
	// var block  = d3.select(document.elementFromPoint(50, 50));
	// console.log(block);
	// var dog = d3.select(document.elementFromPoint(50, 100));
	// console.log(dog);
	//console.log(d3.event.sourceEvent);
	//console.log(client.x+", "+client.y);
	// console.log((width/5) * (dragdx/direction)+", "+(height/5) * (dragdy/direction));
	// console.log(Math.min((width/5) * (dragdx/direction), width/4)+", "+Math.min((height/5) * (dragdy/direction), height/4));
	var svg = d3.select("svg");
	// d3.select("svg")
	// 	.append("rect")
	// 	.attr("width", 10)
	// 	.attr("height", 10)
	// 	.attr("x", event.changedTouches[0].clientX)
	// 	.attr("y", event.changedTouches[0].clientY)
	// 	.attr("fill", "white");
	svg.append("rect")
		.attr("width", 10)
		.attr("height", 10)
		.attr("x", d.x)
		.attr("y", d.y)
		.attr("fill", "green");
	//this is at 0,0
	// svg.append("rect")
	// 	.attr("width", 10)
	// 	.attr("height", 10)
	// 	.attr("x", event.clientX)
	// 	.attr("y", event.clientY)
	// 	.attr("fill", "yellow");
	//console.log(d3.event.sourceEvent.x+", "+d3.event.sourceEvent.y);
	
	console.log("here2");
	
	// Remove the rectangle
	var rect = d3.select("#draggable");
	rect.transition()
		.duration(1000)
			.style("opacity", 0);
	// var dragrect = d3.select("#draggable");
	// dragrect.remove();
	
	console.log("here");
	
	// Get the element position and detect the arc underneath
	var x = event.clientX ? event.clientX : event.changedTouches[0].clientX;
	var y = event.clientY ? event.clientY : event.changedTouches[0].clientY;
	
	setTimeout(function (){
		// console.log("event:");
		// console.log(rect);
		rect.remove();
		// console.log(event);
		// console.log(x);
		// console.log(y);
		
		var elementMouseIsOver = document.elementFromPoint(x, y),
			patharc, tag;
		//console.log(event.changedTouches[0].clientX);
		//console.log(event.changedTouches[0].clientY);

		// console.log(elementMouseIsOver);
		// console.log(d3.select(elementMouseIsOver));	
		patharc = d3.select(elementMouseIsOver)[0][0].__data__;
		// console.log(patharc);
		if(patharc){
			// console.log(patharc.data);	
			tag = patharc.data;
		}else{
			alert("no tag selected");
		}
		// //Put back the circle???
		// svg.append("circle")
		// 	.attr("cy", y)
		//     .attr("cx", x)
		//     .attr("r", cdiameter/2)
		// 	.attr("fill", "grey");

		//Fade out and fade in feedback
		fadeoutall();
		feedback(tag);
    }, 1100);
	

}

function fadeoutall() {
	var svg = d3.selectAll("g")
		.transition()
		.delay(0)
		.duration(2000)
			.style("opacity", 0);
	svg.transition().delay(2000)
		.remove();
	d3.select("svg")
		.transition().delay(2000)
		.remove();
	
}

function feedback(tag) {
	setTimeout(function (){
        var container = d3.select("#container");
		var div = container.append("div")
			.style("color", "white")
			.attr("class", "feedback")
			.style("margin-top", function(){return (height/2)-100 + "px";})
			.style("width", function(){return Math.max(width/4, 200) + "px";});
		div.append("p")
			.text("New note created: \""+note+"\" and tagged \""+tag+"\"");
		div.append("a")
			.attr("href", "index.html")
			.attr("class", "again")
			.text("New Note");
    }, 2000);

}