var languages = ["it-it","es-es","en-uk","fr-fr","de-de","zh-cn","el-gr"];
var images = [];
var choice;
console.log("start-logging");
chrome.storage.sync.get(["languagesStored"],function(result){
	if(result.languagesStored === undefined) {
		chrome.storage.sync.set({"languagesStored": languages});
		console.log("first access");
	} 
});

chrome.storage.sync.get(["languagesStored"],function(result) {
	for (var i = 0; i < result.languagesStored.length; i++) {
		var splitted = result.languagesStored[i].split("-");
		images.push("<img src=" + chrome.runtime.getURL("images/"+splitted[1]+".png") + " >");
		console.log("loaded images");
	}


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
console.log("HTML injeted");

$("#wiki").click(function(e) {
    e.preventDefault();
    chrome.storage.sync.get(["checked"],function(result){ 
    	var language = result.checked.split("-");
    	var url = window.location.href;
    	if(url.includes("&oq=")) {
    		var q = url.match(/q=(.+)&oq=/);
       		var query = q[1];
    		window.location = "https://" + language[0] + '.wikipedia.org/wiki/' + query;
    	} else {
    		var q = url.match(/q=(.+)&/);
       		var query = q[1];
    		window.location = "https://" + language[0] + '.wikipedia.org/wiki/' + query;
    	}
    })
    console.log("WIKI query");
});


for(var i = 0; i < 4; i++) {
$("#row").append(
	"<div class='divTableCell' id='"+ result.languagesStored[i] +"'>" + images[i] + "</div>");
	console.log("Table Injection");
}

for (var i = 0; i < 4; i++) {
		$("#" + result.languagesStored[i]).append(
			"<div class='radio'>" + 
			"<label><input type='radio' name='language' value='"+ result.languagesStored[i] +"' id='"+ result.languagesStored[i]+ "radio" +"'></input>" + 
			"</div>"
		);
		console.log("Table Injection");
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

for(var i = 4; i < result.languagesStored.length; i++) {
	$("#myDropdown").append(
		"<a id='" + result.languagesStored[i] + "' >"+ 							
			images[i] + 
		"</a>" 
	);
}

$("#bottone").click(function(e) {
    e.preventDefault();
    document.getElementById("myDropdown").classList.toggle("show");
    console.log("On click dropDown");
});


	 

for(var i = 4; i < result.languagesStored.length; i++) {
	$("#" + result.languagesStored[i]).click(function(e){
		var value = this.id;
		var splittedValue = value.split("-");
       	var url = window.location.href;
       	if(url.includes("search?sxsrf")) {
	       var newUrl = url.replace("search?sxsrf","search?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] +"&sxsrf");
	       var languages = result.languagesStored;
	       var index = languages.indexOf(value);
	       var temp = languages[0];
	       languages[0] = value;
	       languages[index] = temp;
	       chrome.storage.sync.set({"checked": value});
	       chrome.storage.sync.set({"languagesStored": languages});
	       window.location = newUrl;
	    } else if (url.includes("search?hl=")) {
	   	   var newUrl = url.replace(/search\?hl=(.+)&gl=(.+)&sxsrf/,"search?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] +"&sxsrf");
	   	   var languages = result.languagesStored;
	       var index = languages.indexOf(value);
	       var temp = languages[0];
	       languages[0] = value;
	       languages[index] = temp;
	       chrome.storage.sync.set({"checked": value});
	       chrome.storage.sync.set({"languagesStored": languages});
	       window.location = newUrl;
	   } else if (!(url.includes("hl="))) {
	   	   var splittedUrl = url.split("?");
	   	   var newUrl = splittedUrl[0] + "?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] + "&" + splittedUrl[1];
	   	   console.log(newUrl);
	   	   var languages = result.languagesStored;
	       var index = languages.indexOf(value);
	       var temp = languages[0];
	       languages[0] = value;
	       languages[index] = temp;
	       chrome.storage.sync.set({"checked": value});
	       chrome.storage.sync.set({"languagesStored": languages});
	       window.location = newUrl;
	   }
	});
}

urlChanger();

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

});		

function urlChanger() {
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
	   else if (!(url.includes("search?hl="))) {
	   		var splittedUrl = url.split("?");
	   		var newUrl = splittedUrl[0] + "?hl=" + splittedValue[0] + "&gl=" + splittedValue[1] + "&" + splittedUrl[1];
	   		window.location = newUrl;
	   }	
    }
}

}






