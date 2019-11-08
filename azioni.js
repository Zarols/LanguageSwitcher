
var pathLogo = chrome.runtime.getURL("images/logo.png");
var pathFrance = chrome.runtime.getURL("images/fr.png");
var pathUnitedKingdom = chrome.runtime.getURL("images/gb.png");
var pathItaly = chrome.runtime.getURL("images/it.png");
var pathSpain = chrome.runtime.getURL("images/es.png");
var logo = "<img src=" + pathLogo + " >";
var france = "<img src=" + pathFrance + " >";
var unitedKingdom = "<img src=" + pathUnitedKingdom + " >";
var italy = "<img src=" + pathItaly + " >";
var spain = "<img src=" + pathSpain + " >";

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
//"<div class='divTableCell' id='logo'>" + logo + "</div>" +
"</div>" +
"</form>" +
"</div>" +
"</div>"
);


//inject the radio button in the extension's graphic
$("#it").append(
"<div class='radio'>" + 
"<label><input type='radio' name='language' id='itradio' checked value='it'></input>" + 
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

var url = window.location.href;
var radios = document.forms["formA"].elements["language"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
       //alert(url);
       //window.location.href = "https://www.google.it/";
       alert("ciao!");
    }
}







