//Global vars

var insertingStyle = 1;
var numCreatedComponent = 0;

var createdComponentsArray = new Array();
var currentSelectedElement = null;

$(document).ready( function (){

	//---------------------------------------------------------------------
	//--------------------------INITIALIZATION-----------------------------
	//---------------------------------------------------------------------

	// $("#")

	$("#custom").spectrum({
	    color: "#f00"
	});

	$('#tree1').treed();

	//---------------------------------------------------------------------
	//-------------------------------EVENTS--------------------------------
	//---------------------------------------------------------------------

	$("button.int").on('click', function (){
		
		// var selectedChildElem = $("#paginaweb").selectedElem;
		var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;
		
		var text = $(this).text();

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

	$("#edit-direct-save").click(function (){
		var cssProps = $("#edit-direct").val();
		var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;
		//get the old styles from the elem

		//IMPORTANT! More styles may apply to this element from a file
		var oldStyles = $(selectedChildElem).attr("style");

		var inputStyles = $("#edit-direct").val();
		var styleList = inputStyles.split(";");

		var finalArray = new Array();
		// var finalArray = "";
		var plainObj = {};

		$.each(styleList, function(key,value){
			var min = value.split(":");
			var arr = new Array();
			// arr[min[0]] = min[1];
			// finalArray.push(arr);
			plainObj[min[0]] = min[1];
			finalArray[ min[0] ] = min[1];

			// if (key == styleList.length - 1)
			// 	finalArray += value;
			// else
			// 	finalArray += value + ",";
		});

		var obj = toObject(finalArray);
		// var strin = JSON.stringify(finalArray);
		$(selectedChildElem).css(plainObj);

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

	$("#component-button").click(function (){
		var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;		
		var createdButton = $("<button>").attr("class","btn btn-default btn-created-component").attr("num",numCreatedComponent + "").text("Created component " + numCreatedComponent);
		numCreatedComponent += 1;

		//IF the same element is referenced instead of a clone, then the element will be moved!
		//Move method: createdComponentsArray.push(selectedChildElem);

		createdComponentsArray.push($(selectedChildElem).clone());
		
		$("#components-body").append(createdButton);
		alert("Component created!");

		$(".btn-created-component").click(function (){
			var num = parseInt($(this).attr("num"));
			var component = createdComponentsArray[num];

			var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;

			//DRY FIX

			if (insertingStyle == 0) {
				$(selectedChildElem).before($(component).clone());
			}else if (insertingStyle == 1) {
				$(selectedChildElem).append($(component).clone());
			}else if (insertingStyle == 2) {
				$(selectedChildElem).after($(component).clone());
			}
		});
	});

	$("#up-one-btn").click(function (){

	});

	$("#down-one-btn").click(function (){

	});
});

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

function editSelectedElement(){
	var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;
	$("#edit-input").val($(selectedChildElem).text());
}

function saveEditChangesElement(){

}

function selectedElementChanged(){
	var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;
	$("#tag-name").text($(selectedChildElem).prop("tagName"));

	//CALL to recursive algorithm function
	makeTreed();
	$('#tree1').treed();	
}

function makeTreed(){
	var selectedChildElem = $("#paginaWeb")[0].contentWindow.selectedElem;
	// console.log($(selectedChildElem).prop("tagName"));

	var rootElement = $("#tree1");
	//erase the current tree
	$(rootElement).empty();

	// var base = $("<li>");
	// var baseLi = $("<a>").attr("href","#").text($(selectedChildElem).prop("tagName"));
	// $(base).append($(baseLi));
	// $(rootElement).append($(base));

	//CORE of the function
	if($(selectedChildElem).children().length > 0){
		tree(rootElement,selectedChildElem);
	}
}

function tree(base,currentElem){
	var children = $(currentElem).children();
	if(children.length == 0){
		//base case
		var child = $("<li>").text($(currentElem).prop("tagName"));
		$(base).append($(child));
	}else{
		var li = $("<li>").text($(currentElem).prop("tagName"));
		var ul = $("<ul>");
		for (var i = 0; i < children.length; i++) {
			tree(ul,children[i]);	
		}
		$(li).append($(ul));
		$(base).append($(li));
	}
}



