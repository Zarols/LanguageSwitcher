
var languages = ["it-it","es-es","en-uk","fr-fr"];
var images = [];
var choice;
for (var i = 0; i < languages.length; i++) {
	var splitted = languages[i].split("-");
	images.push("<img src=" + chrome.runtime.getURL("images/"+splitted[1]+".png") + " >");
}

$("#before-appbar").append(
"<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>" +
"<div class='divTable'>" +
"<div class'divTableBody' style='border:1px solid #E0E0E0; border-radius:10px;'>" +
"<form name='formA'>" +
"<div class='divTableRow' id='row'>" +
"<div class='divTableCell'><font size='3'><b>Language:</b></font></div>" +
"</div>" +
"</form>" +
"</div>" +
"</div>"
);
for(var i = 0; i < languages.length; i++) {
$("#row").append(
	"<div class='divTableCell' id='"+ languages[i] +"'>" + images[i] + "</div>");
}
for (var i = 0; i < languages.length; i++) {
		$("#" + languages[i]).append(
			"<div class='radio'>" + 
			"<label><input type='radio' name='language' value='"+ languages[i] +"' id='"+ languages[i]+ "radio" +"'></input>" + 
			"</div>"
		);
	}
var radios = document.forms["formA"].elements["language"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
       var value = this.value;
       chrome.storage.sync.set({"checked": value});
       var splittedValue = value.split("-");
       var url = window.location.href;
       //var q = url.match(/q=(.+)&oq=/);
       //var query = q[1];
       if(url.includes("search?sxsrf")) {
	       var newUrl = url.replace("search?sxsrf","search?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] +"&sxsrf");
	       window.location = newUrl;
	   } else if (url.includes("search?hl=")) {
	   		var newUrl = url.replace(/search\?hl=(.+)&gl=(.+)&sxsrf/,"search?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] +"&sxsrf");
	   		window.location = newUrl;
	   }	
    }
}

chrome.storage.sync.get(["checked"],function(result){
	$("#"+result.checked+"radio").prop("checked", true);
});








