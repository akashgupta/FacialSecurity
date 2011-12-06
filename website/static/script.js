function onReturn(urls, response) {
    console.log(response);
}

$(document).ready(function() {
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            console.log(response.authResponse);

	    var urls = ["https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/230131_10150185516282229_504182228_6642763_1929002_n.jpg"];

	    var options = {
		uids: "friends@facebook.com",
		namespace: "facebook.com",
		user_auth:
		    "fb_user:" + response.authResponse.userID + "," +
		    "fb_oauth_token:" + response.authResponse.accessToken
	    };
	    var apiKey = "24fa7980be31a5332723ce74780786e6";
	    var faceApi = new Face_ClientAPI(apiKey);
	    console.log(window.hostname);
	    faceApi.faces_recognize(urls, options, onReturn);
        } else {
            console.log("Not logged in");
        }
    });
});
