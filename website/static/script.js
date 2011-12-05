$(document).ready(function(){
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            console.log("Auth Response");
        } else {
            console.log("Not logged in");
        }
    });
});