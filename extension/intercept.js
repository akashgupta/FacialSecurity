function onReturn(response) {
  console.log(response);
}

$(document).ready(function() {
  console.log("STARTING UP LIKE A BOSS");
  
  // TODO: Act when an textarea gets changed / focus
  /*$("textarea").change(function() {
    
  });*/

 var redirectUrl = "https://hkn.eecs.berkeley.edu";
 chrome.extension.sendRequest({redirect: redirectUrl});

  /*
  // Below lies face rec stuff
  var urls = ["https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/230131_10150185516282229_504182228_6642763_1929002_n.jpg"];

  // The user_auth section should be replaced with a pipeline to grab an access token via the fb js api
  var options = {
    uids: "friends@facebook.com",
    namespace: "facebook.com",
    user_auth: {
      fb_user: "504182228",
      fb_oauth_token: "AAADJcQyunroBAHVU94w6YF4ZCMUyPEMOrU6ZBf72Ts5VZCqZAlyosOACmGiHPEV4TKbsZAP0wilv5XqH9K5NF0Jp8Wa7NwQUEeGzRYqzVfQZDZD"
    },
    detector: "Aggressive"
  };

  var apiKey = "24fa7980be31a5332723ce74780786e6";
  var faceApi = new Face_ClientAPI(apiKey);
  console.log(window.hostname);
  faceApi.faces_recognize(urls, options, onReturn);
  */
});
