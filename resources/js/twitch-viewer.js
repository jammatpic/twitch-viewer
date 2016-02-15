var steamers  = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

$(document).ready(function() {
    $.getJSON('https://api.twitch.tv/kraken/streams/ESL_SC2?callback=?', function(data) {
        console.log(JSON.stringify(data));
    });
});