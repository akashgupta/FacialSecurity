var uid = -1;

// Allows us to post to the db
function post(path, params, method) {
    $.post(path, params);
}

function getProfilePicURL(id) {
    return "https://www.facebook.com/" + id;
}

function onReturn(urls, response) {
    console.log(response);
    var myDate = new Date();
    var dateString = myDate.toString();

    var userExists = false;
    console.log(response.status);
    for (var photoIndex in response.photos) {
	for (var tagIndex in response.photos[photoIndex]["tags"]) {
	    console.log(tagIndex);
	    recogUID = response.photos[photoIndex]["tags"][tagIndex]["uids"][0]["uid"];
	    recogUID = recogUID.substring(0, recogUID.length - 13);
	    if (recogUID == uid) {
		userExists = true;
	    }
	    var profilePicURL = getProfilePicURL(recogUID);
	    options = {
		time : dateString,
		photo : profilePicURL,
		uid : recogUID
	    }
	    post("http://ghost.eecs.berkeley.edu:8888/add", options, "post");
	}
    }

    if (userExists == true) {
	// Redirect to fb
	window.location.replace(localStorage["fbUrl"]);
    } else {
	window.location.replace("http://ghost.eecs.berkeley.edu:8888/rejected");
    }
}

function onAuthenticated(response) {
    console.log(response.authResponse);

    uid = response.authResponse.userID;
    var urls = ["https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/230131_10150185516282229_504182228_6642763_1929002_n.jpg"];

    var options = {
	uids: "friends@facebook.com",
	namespace: "facebook.com",
	user_auth:
	"fb_user:" + uid + "," +
	    "fb_oauth_token:" + response.authResponse.accessToken
    };
    var apiKey = "24fa7980be31a5332723ce74780786e6";
    var faceApi = new Face_ClientAPI(apiKey);
    faceApi.faces_recognize(urls, options, onReturn);
}

$(document).ready(function() {
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            $(".fb-login-button").remove();
            onAuthenticated(response);
        } else {
            console.log("Not logged in");
        }
    });
});
