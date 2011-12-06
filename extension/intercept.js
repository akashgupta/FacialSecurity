$(document).ready(function() {
  console.log("STARTING UP LIKE A BOSS");
  
  // TODO: Act when an textarea gets changed / focus
  /*$("textarea").change(function() {
    
  });*/

  var prevTime = 0;
  if (localStorage["redirectTime"]) {
	console.log("existed");
  	prevTime = localStorage["redirectTime"];
  } else {
	console.log("didn't exist");
	prevTime = 0;
  }

	var time = new Date();
    var seconds = time.getUTCSeconds();
	if (seconds > (prevTime + 300)) {
		localStorage["redirectTime"] = seconds;
		var redirectUrl = "http://ghost.eecs.berkeley.edu:8888/login";
		chrome.extension.sendRequest({redirect: redirectUrl});
	}
 });
