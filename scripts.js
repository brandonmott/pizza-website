/********* Using AJAX *********/
var ajax = new XMLHttpRequest();
var file = "/school/public/assets/json/links.json";

ajax.onreadystatechange = function(){
  //alert("readyState: " + ajax.readyState + "   response: " + ajax.status)
  if (ajax.readyState == 4 && ajax.status == 200){
    showSites(ajax.responseText);
  }
}

function showSites(data){
  //alert(data);
  var obj = JSON.parse(data);
  var output = "";
  for (var i=0; i<obj.sites.length; i++) {
    output += "<a href='" + obj.sites[i].url + "'>" + obj.sites[i].display + "</a><br>";
  }
  document.getElementById("output").innerHTML = output;
}

   ajax.open("GET", file, true);
   ajax.send();

/*******  the Menu javascript  *******/
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

/******* The Pizza javascript *******/
$( document ).ready(function() { 
  
var ajax = new XMLHttpRequest();
var file = "/school/public/assets/json/pizza.json";

ajax.onreadystatechange = function(){
	//alert("readyState: " + ajax.readyState + "   response: " + ajax.status)
	if (ajax.readyState === 4 && ajax.status === 200){
		showSites(ajax.responseText);
    addEvents();
	}
};

/* helper function to show sites that applies the div tags */
function headerAndDivs( obj, x ){
  var output = "";
  if(obj.pizza[x].input[0].type !== "img"){
    output += '<div id="'+ obj.pizza[x].div[0].head +'" class="'+ obj.pizza[x].div[0].class +'"><div class="'+ obj.pizza[x].div[1].class +'">';
		output += '<div class="'+ obj.pizza[x].div[2].class +'"><h3>'+obj.pizza[x].div[1].head+'</h3></div><table class="table"><thead><tr><th scope="row">';
    output += obj.pizza[x].div[2].head +'</th></tr></thead><tbody>';
    } else {
    output += '<div id="'+ obj.pizza[x].div[0].id +'" class="' + obj.pizza[x].div[0].class + '">';
    } 
  return output;
}
/* parse all the JSON-ajax (huge mess, needs to be refactored) */
function showSites(data){
	//alert(data);
	var obj = JSON.parse(data);
	var output = "";
	for(var x in obj.pizza){
    
    switch (obj.pizza[x].input[0].type) {
      case "text":  
        output += '<form action="' + obj.pizza[x].form.action + '" method="' + obj.pizza[x].form.method + '" id="' + obj.pizza[x].form.id + '">';
        output += headerAndDivs( obj, x );
        for(var i = 0; i < obj.pizza[x].input.length; i++) { 
        output += '<tr><th scope="row">'+obj.pizza[x].input[i].label+'<input type="'+obj.pizza[x].input[i].type+'" class="form-control" title="'+ obj.pizza[x].input[i].title +'" name="'+obj.pizza[x].input[i].name+'"></th></tr>';
        }
        //buttons
        output += '<tr><th scope="row"><p class="text-center">';
        for(i = 0; i < obj.pizza[x].buttons.length; i++) { 
        output += '<button type="'+ obj.pizza[x].buttons[i].type +'" name="'+ obj.pizza[x].buttons[i].name +'" id="'+ obj.pizza[x].buttons[i].name +'" class="'+ obj.pizza[x].buttons[i].class +'">';
        output += obj.pizza[x].buttons[i].label +'&nbsp;&nbsp;<span style="'+ obj.pizza[x].buttons[i].spanStyle +'" class="'+ obj.pizza[x].buttons[i].spanClass +'"></span>';
        }
        output += '</p></th></tr></tbody></table></div></div></form>';
        break;
      case "radio":
        output += '<form action="' + obj.pizza[x].form.action + '" method="' + obj.pizza[x].form.method + '" id="' + obj.pizza[x].form.id + '">';
        output += headerAndDivs( obj, x );
        output += '<form action="' + obj.pizza[x].form.action + '" method="' + obj.pizza[x].form.method + '" id="' + obj.pizza[x].form.id + '">';
        for(i = 0; i < obj.pizza[x].input.length; i++) { 
          output += '<tr class="form-inline"><th scope="row"><label style="padding-left:10px;" for="'+ obj.pizza[x].input[i].name +'"><input type="'+ obj.pizza[x].input[i].type +'" class="form-control" name="';
          output +=  obj.pizza[x].input[i].name + '" value="'+ obj.pizza[x].input[i].value +'">'+ obj.pizza[x].input[i].label+'</label></th></tr>';
        }
        output += '</p></th></tr></tbody></table></div></div>';
        break;
      case "img":
        output += headerAndDivs( obj, x );
        output += '<table></tbody><tr class=""><th scope="row">';
        for(i = 0; i < obj.pizza[x].input.length; i++) { 
          output += '<img style="'+ obj.pizza[x].input[i].style +'" id="'+ obj.pizza[x].input[i].id +'" class="'+ obj.pizza[x].input[i].class;
          output += '" src="/school/public/assets/images/'+ obj.pizza[x].input[i].src + '" width="'+ obj.pizza[x].input[i].width +'" height="'+ obj.pizza[x].input[i].height+'" alt="'+obj.pizza[x].input[i].alt+'">';
        }
        output += '</th></tr></tbody></table></div>';
        break;
      case "select":
        output += headerAndDivs( obj, x );
        output += '<tr><th scope="row"><select class="form-control" name="'+ obj.pizza[x].input[0].name +'">';
        for(i = 0; i < obj.pizza[x].input.length; i++) { 
            output += '<option value="'+ obj.pizza[x].input[i].value +'" class="form-control">'+ obj.pizza[x].input[i].label +'</option>';
        }
        output += '</select></th></tr>';
        //textarea
        output += '<tr><th><textarea class="form-control" rows="'+ obj.pizza[x].comment.rows +'" cols="'+ obj.pizza[x].comment.cols +'" name="'+ obj.pizza[x].comment.name;
        output += '" form="'+ obj.pizza[x].comment.form +'">'+ obj.pizza[x].comment.label +'</textarea></th></tr></tbody></table></div></div>';
         break;
      case "checkbox":
        output += headerAndDivs( obj, x );
        output += '<tr><th class="btn-group-justified" style="overflow:auto; display:inline;">';
        for(i = 0; i < obj.pizza[x].input.length; i++) {
           output += '<label class="btn bg-info" style="min-width: 95px;" for="'+ obj.pizza[x].input[i].name +'">';
           output +='<input type="'+ obj.pizza[x].input[i].type +'" onclick="toggleToppings(this)" class="form-control" id="'+ obj.pizza[x].input[i].id +'" value="'+ obj.pizza[x].input[i].value +'" name="';
           output += obj.pizza[x].input[i].name +'">'+ obj.pizza[x].input[i].label +'</label>';
           if(i === 6){
             output += '</th></tr><tr><th class="btn-group-justified" style="overflow:auto; display:inline;">';
           }
        }
        output += '</th></tr>';       
        //buttons
        output += '<tr><th scope="row"><p class="text-center">';
        for(i = 0; i < obj.pizza[x].buttons.length; i++) { 
        output += '<button type="'+ obj.pizza[x].buttons[i].type +'" name="'+ obj.pizza[x].buttons[i].name +'" id="'+ obj.pizza[x].buttons[i].name +'"  class="'+ obj.pizza[x].buttons[i].class +'">';
        output += obj.pizza[x].buttons[i].label +'&nbsp;&nbsp;<span style="'+ obj.pizza[x].buttons[i].spanStyle +'" class="'+ obj.pizza[x].buttons[i].spanClass +'"></span></button>';
        }
        output += '</p></th></tr></tbody></table></div></div></form>';
        break; 
    }    
    

	}

	document.getElementById("output").innerHTML = output;
  
}
   //sends the ajax request
   ajax.open("GET", file, true);
   ajax.send();

/*dialog box is third UI */
/* add events to the html from the javascript that got generated*/
function addEvents(){
  var dialog = $("#dialog-sign-in").dialog({
    autoOpen: false,
    height: 200,
    width: 350,
    modal: true
  });
  /* handling when a user signs in by dialog */
  function signInUser(){ 
    $("a#signIn").replaceWith("<a id='signOut' href='#'>Sign Out</a>");
    $("a#signOut").on("click", function(){
      $(this).replaceWith("<a id='signIn' href='#'>Sign In</a>");
        readyState();
    }); 
  }
  /* adding events to the main document */
  function readyState(){
    $("a#signIn").on("click", function( event ){
      event.preventDefault();
      dialog.dialog("open");
    });
    
    $("button#signIn").on("click", function( event){
      event.preventDefault();
      dialog.dialog("open");
    });
    
    $("#signIncancel").on("click", function( event ) {
      event.preventDefault();
      dialog.dialog("destroy");
    }); 
    
    $("#signInSubmit").on("click", function( event ) {
      event.preventDefault();
        dialog.dialog("close");
        signInUser();
    });
  }
 readyState();//calling method to add all events for original document state
}

}); //doc ready
                                                                                                    /
/* adding toppings to the image */
function toggleToppings(elem) {
  var x = "#pizzaImage #img-" + elem.id;
  $(x).toggle( "fold", 500);
}
</script>