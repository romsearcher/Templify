var selectedElem = null;
var temp = null;

$(document).ready(function() {

	$("#rmenu").hide();

	$(document).bind("contextmenu", function(event) {
		event.preventDefault();

		$("#rmenu").css({top: event.pageY + "px", left: event.pageX + "px"});
		$("#rmenu").show();

        // var text = $(event.target).text();
        // console.log(text);
        temp = $(event.target);
    });

	$(document).bind("click", function(event) {
		$("#rmenu").hide();
	});

	$("#select").click(function (){
		if (selectedElem != null){
			selectedElem.css("color", "black");
		}
		selectedElement(temp);
	});

	$("#delete").click(function (){
		if (temp != null) {
			$(temp).remove();
			temp = null;
			selectedElem = null;
		}
	});
});

function selectedElement(element){
	selectedElem = element;
	temp = null;
	$(selectedElem).css("color","red");
}

function mouseX(evt) {
	if (evt.pageX) {
		return evt.pageX;
	} else if (evt.clientX) {
		return evt.clientX + (document.documentElement.scrollLeft ?
			document.documentElement.scrollLeft :
			document.body.scrollLeft);
	} else {
		return null;
	}
}

function mouseY(evt) {
	if (evt.pageY) {
		return evt.pageY;
	} else if (evt.clientY) {
		return evt.clientY + (document.documentElement.scrollTop ?
			document.documentElement.scrollTop :
			document.body.scrollTop);
	} else {
		return null;
	}
}