// JavaScript Document
window.onload = function(){
var ajax = new XMLHttpRequest();
var file = "/school/public/assets/json/menu.json";

ajax.onreadystatechange = function(){
	//alert("readyState: " + ajax.readyState + "   response: " + ajax.status);
	if (ajax.readyState == 4 && ajax.status == 200){
		showSites(ajax.responseText);
	}
};

function showSites(data){
	//alert(data);
	var obj = JSON.parse(data);
	var output = "";
	for (var i=0; i<obj.sites.length; i++) {
		output += "<a class='navCell' href='" + obj.sites[i].url + "' target='self'><div class='navCellInner'><span>" + obj.sites[i].display + "</span></div></a>";
	}
	//alert(output);
	document.getElementById("flipMenu").innerHTML = output;
}

   ajax.open("GET", file, true);
   ajax.send();
};
 