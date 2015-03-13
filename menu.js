var selectedElem = null;
var temp = null;

var lockMenu = false;

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
		if (!lockMenu) {
			$("#rmenu").hide();
		}	
	});

	$("#select").click(function (){
		if (selectedElem != null){
			//REMOVE
			// selectedElem.css("color", "black");
		}
		selectedElement(temp);
		window.parent.selectedElementChanged();
	});

	$("#delete").click(function (){
		if (temp != null) {
			if ($(selectedElem).is(temp) && $(selectedElem).is($("body"))){
				temp = null;
			}else if ($(selectedElem).is(temp)) {
				$(".templify-wrapper").remove();
				temp = null;
				selectedElem = null;
			}else if ($(".templify-wrapper").is(temp)) {
				temp = null;
			}else if ($("body").is(temp)){
				temp = null;
			}else{
				$(temp).remove();
				temp = null;
			}
		}
		//ISSUE #9 Manage the templify-wrapper
		window.parent.selectedElementChanged();
	});

	$("#edit").click(function (){
		if (temp != null) {
			selectedElem = temp;
			window.parent.editSelectedElement();
		}
	});

	$("#css").click(function (){
    	// lockMenu = true;
    });

	$("#parent").click(function (){
		if (selectedElem != null){
			// selectedElem.css("color", "black");
		}
		selectedElement($(temp).parent());
		window.parent.selectedElementChanged();
	});

});

//Important function! Should correctly manage the style of the selected element
function selectedElement(element){
	if(selectedElem != null){
		// var elem = selectedElem;
		// var par = $(selectedElem).parent().parent();
		// $("div.templify-wrapper").remove();
		// $(par).append($(selectedElem));
		$(selectedElem).unwrap();	
	}
	selectedElem = element;
	temp = null;

	// var wrapper = $("<div>").attr("class","templify-wrapper");

	// var parent = $(selectedElem).parent();
	// $(wrapper).append(selectedElem);
	// $(parent).append($(wrapper)); 

	$(selectedElem).wrap("<div class='templify-wrapper'></div>");
	// $(selectedElem).css("color","red");
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