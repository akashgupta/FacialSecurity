function doStuff() {
    
}

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
    var year = time.getUTCFullYear();
    var month = time.getUTCMonth();
    var day = time.getUTCDay();
    var hours = time.getUTCHours();
    var minutes = time.getUTCMinutes();
    var seconds = time.getUTCSeconds();
    console.log(year, month, day, hours, minutes, seconds);
    var utctime = Date.UTC(year,month,day,hours,minutes,seconds);
    console.log("threshold", (prevTime + 60000));
    console.log("current time", utctime);

    if (parseInt(utctime) > (parseInt(prevTime) + parseInt(60000))) {
		localStorage["redirectTime"] = utctime;
		var redirectUrl = "http://ghost.eecs.berkeley.edu:8888/login";
		chrome.extension.sendRequest({redirect: redirectUrl});
	}
	//setTimeout(doStuff, 10000);
 });
