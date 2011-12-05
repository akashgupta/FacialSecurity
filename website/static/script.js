$(document).ready(function(){
    $("#button").click(function(){
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    FB.logout(function(response) {
                        console.log('Logged out.');
                    });
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email'});
    });
});