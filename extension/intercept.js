function onReturn(response) {
  console.log(response);
}

$(document).ready(function() {
  console.log("STARTING UP LIKE A BOSS");
  
  // TODO: Act when an textarea gets changed / focus
  /*$("textarea").change(function() {
    
  });*/

 var redirectUrl = "http://ghost.eecs.berkeley.edu:8888/login";
 chrome.extension.sendRequest({redirect: redirectUrl});
});
