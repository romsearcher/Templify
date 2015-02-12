$(document).ready( function (){

	$("#custom").spectrum({
	    color: "#f00"
	});

	$("button.int").on('click', function (){
		
		// var selectedChildElem = $("#paginaweb").selectedElem;
		var pag = $("#paginaWeb");
		var selectedChildElem = pag[0].contentWindow.selectedElem;
		
		var text = $(this).text();

		if (text === "div") {
			$(selectedChildElem).append($("<div>").text("This is an inserted div tag"));
		}else if (text === "p") {
			$(selectedChildElem).append($("<p>").text("This is an inserted p tag"));
		}else if (text === "ul") {
			$(selectedChildElem).append($("<ul>").text("list"));
		}else if (text === "li") {
			$(selectedChildElem).append($("<li>").text("list item"));
		};
	});
});