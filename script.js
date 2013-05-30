function handleClick(event){
    console.log(document.getElementById("note").value);
    transition(document.getElementById("note").value);
    return false;
}

function transition(val){
    var textarea = d3.select("textarea#note")
		.transition()
		.duration(3000) //3 secs
			.style("width", "1px")
			.style("height", "1px");
	d3.select("#submit")
		.transition()
		.duration(3000)
			.style("opacity", 0)
		.remove();
}