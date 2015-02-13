//Global vars

var insertingStyle = 1;

$(document).ready( function (){

	//---------------------------------------------------------------------
	//--------------------------INITIALIZATION-----------------------------
	//---------------------------------------------------------------------

	// $("#")

	$("#custom").spectrum({
	    color: "#f00"
	});

	//---------------------------------------------------------------------
	//-------------------------------EVENTS--------------------------------
	//---------------------------------------------------------------------

	$("button.int").on('click', function (){
		
		// var selectedChildElem = $("#paginaweb").selectedElem;
		var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;
		
		var text = $(this).text();

		// if (text === "div") {
		// 	$(selectedChildElem).append($("<div>").text("This is an inserted div tag"));
		// }else if (text === "p") {
		// 	$(selectedChildElem).append($("<p>").text("This is an inserted p tag"));
		// }else if (text === "ul") {
		// 	$(selectedChildElem).append($("<ul>").text("list"));
		// }else if (text === "li") {
		// 	$(selectedChildElem).append($("<li>").text("list item"));
		// };
		if (insertingStyle == 0) {
			$(selectedChildElem).before($("<" + text + ">").text("This is a before " + text));
		}else if (insertingStyle == 1) {
			$(selectedChildElem).append($("<" + text + ">").text("This is an appended " + text));
		}else if (insertingStyle == 2) {
			$(selectedChildElem).after($("<" + text + ">").text("This is a after " + text));
		}
	});

	$("#edit-button").click(function (){
		var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;
		var text = $("#edit-input").val();
		$(selectedChildElem).text(text);
	});

	$(".btn-insert").click(function (){
		var text = $(this).text();
		if (text === "Before"){
			insertingStyle = 0;
			$("#btn-append").attr("class","btn btn-default btn-insert");
			$("#btn-after").attr("class","btn btn-default btn-insert");
			$("#btn-before").attr("class","btn btn-default btn-insert active");
		}
		else if (text === "Append"){
			insertingStyle = 1;
			$("#btn-before").attr("class","btn btn-default btn-insert");
			$("#btn-append").attr("class","btn btn-default btn-insert active");
			$("#btn-after").attr("class","btn btn-default btn-insert");
		}
		else if (text === "After"){
			insertingStyle = 2;
			$("#btn-before").attr("class","btn btn-default btn-insert");
			$("#btn-append").attr("class","btn btn-default btn-insert");
			$("#btn-after").attr("class","btn btn-default btn-insert active");
		}
	});
});

function editSelectedElement(){
	var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;
	$("#edit-input").val($(selectedChildElem).text());
}

function saveEditChangesElement(){

}