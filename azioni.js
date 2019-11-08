
var france = "<img src=" + chrome.runtime.getURL("images/fr.png") + " >";
var unitedKingdom = "<img src=" + chrome.runtime.getURL("images/gb.png") + " >";
var italy = "<img src=" + chrome.runtime.getURL("images/it.png") + " >";
var spain = "<img src=" + chrome.runtime.getURL("images/es.png") + " >";

//inject graphic of extension
$("#appbar").append(
"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css'>" +
"<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>" +
"<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js'></script>" +
"<div class='divTable'>" +
"<div class'divTableBody' style='border:1px solid #E0E0E0; border-radius:10px;'>" +
"<form name='formA'>" +
"<div class='divTableRow'>" +
"<div class='divTableCell'><font size='3'><b>Language:</b></font></div>" +
"<div class='divTableCell' id='it'>" + italy + "</div>" +
"<div class='divTableCell' id='en'>" + unitedKingdom + "</div>" +
"<div class='divTableCell' id='fr'>" + france + "</div>" +
"<div class='divTableCell' id='es'>" + spain + "</div>" +
"</div>" +
"</form>" +
"</div>" +
"</div>"
);


//inject the radio button in the extension's graphic
$("#it").append(
"<div class='radio'>" + 
"<label><input type='radio' name='language' id='itradio' value='it'></input>" + 
"</div>"
);
$("#en").append(
"<div class='radio'>" + 
"<label><input type='radio' name='language' id='enradio' value='en'> </input>" + 
"</div>"
);
$("#fr").append(
"<div class='radio'>" + 
"<label><input type='radio' name='language' id='frradio' value='fr'></input>" + 
"</div>"
);
$("#es").append(
"<div class='radio'>" + 
"<label><input type='radio' name='language' id='esradio' value='es'></input>" + 
"</div>"
);

var radios = document.forms["formA"].elements["language"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
       var url = window.location.href;
       var q = url.match(/q=(.+)&oq=/);
       var query = q[1];
       if(url.includes("search?sxsrf")) {
	       var newUrl = url.replace("search?sxsrf","search?hl=" + this.value + "&gl=" + this.value +"&sxsrf");
	       window.location = newUrl;
	   } else if (url.includes("search?hl=")) {
	   		var newUrl = url.replace(/search\?hl=(.+)&gl=(.+)&sxsrf/,"search?hl=" + this.value + "&gl=" + this.value +"&sxsrf");
	   		window.location = newUrl;
	   }
    }
}







