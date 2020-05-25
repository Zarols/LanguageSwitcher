var languages = ["it-it","es-es","en-uk","fr-fr","de-de","zh-cn","el-gr"];
var images = [];
var choice;
for (var i = 0; i < languages.length; i++) {
	var splitted = languages[i].split("-");
	images.push("<img src=" + chrome.runtime.getURL("images/"+splitted[1]+".png") + " >");
}
var wikiUrl = '.wikipedia.org/wiki/';

$("#before-appbar").append(
"<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>" +
"<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>" +
"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css'>"+
"<div class='divTable' id='divTable'>" +
"<div class'divTableBody' style='border:1px solid #E0E0E0; border-radius:10px; padding:8px;' id='divTableBody'>" +
"<form name='formA'>" +
"<div class='divTableRow' id='row'>" +
"<div class='divTableRow' id='row'>" +
"<div class='divTableCell'><font size='3'><b>Language:</b></font></div>" +
"</div>" +
"<div class='divTableRow' id='row'>" +
"<button type='button' class='btn btn-primary' id='wiki'>Wikipedia &nbsp <i class='fa fa-search'></i></button>" +
"</div>" +
"</form>" +
"</div>" +
"</div>" +
"</div>"
);

$("#wiki").click(function(e) {
    e.preventDefault();
    chrome.storage.sync.get(["checked"],function(result){ 
    	var language = result.checked.split("-");
    	var q = url.match(/q=(.+)&oq=/);
        var query = q[1];
    	window.location = "https://" + language[0] + wikiUrl + query;
    })
});

for(var i = 0; i < 4; i++) {
$("#row").append(
	"<div class='divTableCell' id='"+ languages[i] +"'>" + images[i] + "</div>");
}

for (var i = 0; i < 4; i++) {
		$("#" + languages[i]).append(
			"<div class='radio'>" + 
			"<label><input type='radio' name='language' value='"+ languages[i] +"' id='"+ languages[i]+ "radio" +"'></input>" + 
			"</div>"
		);
	}

$("#row").append(
	"<div class='divTableCell' id='dropDown'>"+
    "</div>"
	);

$("#dropDown").append(
        "<button class='dropbtn' id='bottone'>Other&nbsp;" + 
        "<i class='fa fa-angle-double-down'></i>" +
        "</button>" +
        "<div id='myDropdown' class='dropdown-content'></div>"
        );

for(var i = 4; i < languages.length; i++) {
	$("#myDropdown").append(
		"<a id='" + languages[i] + "' >"+ 							
			images[i] + 
		"</a>" 
	);
}
			 

$("#bottone").click(function(e) {
    e.preventDefault();
    document.getElementById("myDropdown").classList.toggle("show");
});

for(var i = 4; i < languages.length; i++) {
	$("#" + languages[i]).click(function(e){
		var value = this.id;
		var splittedValue = value.split("-");
       	var url = window.location.href;
       	if(url.includes("search?sxsrf")) {
	       var newUrl = url.replace("search?sxsrf","search?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] +"&sxsrf");
	       chrome.storage.sync.set({"checked": value});
	       window.location = newUrl;
	    } else if (url.includes("search?hl=")) {
	   	   var newUrl = url.replace(/search\?hl=(.+)&gl=(.+)&sxsrf/,"search?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] +"&sxsrf");
	   	   chrome.storage.sync.set({"checked": value});
	   	   window.location = newUrl;
	   }	
	});
}

var radios = document.forms["formA"].elements["language"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
       var value = this.value;
       chrome.storage.sync.set({"checked": value});
       var splittedValue = value.split("-");
       var url = window.location.href;
       if(url.includes("search?sxsrf")) {
	       var newUrl = url.replace("search?sxsrf","search?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] +"&sxsrf");
	       window.location = newUrl;
	   } else if (url.includes("search?hl=")) {
	   		var newUrl = url.replace(/search\?hl=(.+)&gl=(.+)&sxsrf/,"search?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] +"&sxsrf");
	   		window.location = newUrl;
	   }	
    }
}

var control  = window.location.href;
if(control.includes("search?hl=")) {
	chrome.storage.sync.get(["checked"],function(result){
		var radios = document.forms["formA"].elements["language"];
		for(var i = 0; i < radios.length; i++) {
			if(result.checked == radios[i].value) {
				$("#"+result.checked+"radio").prop("checked", true);
			} else {
				images[0] = images[4];
			}
		}
	});
} else {
	$("#it-itradio").prop("checked",true);
}








