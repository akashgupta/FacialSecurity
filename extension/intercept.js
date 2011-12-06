$(document).ready(function() {
  console.log("STARTING UP LIKE A BOSS");
  
  // TODO: Act when an textarea gets changed / focus
  /*$("textarea").change(function() {
    
  });*/

  if (localStorage["redirectTime"]) {
    var time = new Date();
    var seconds = time.getUTCSeconds();
		if (seconds > (localStorage["redirectTime"] + 300)) {
			localStorage["redirectTime"] = seconds;
			var redirectUrl = "http://ghost.eecs.berkeley.edu:8888/login";
 			chrome.extension.sendRequest({redirect: redirectUrl});
	 	}
  }
 });
