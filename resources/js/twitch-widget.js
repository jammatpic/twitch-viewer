var streamers  = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "ESL_SC2", "OgamingSC2", "sheevergaming", "brunofin", "comster404"];

$(document).ready(function() {
    for (var user in streamers) {
        $.getJSON("https://api.twitch.tv/kraken/streams/" + streamers[user] + "?callback=?", function(data) {
            // if account does not exist
            if (data.error) {
                $(".main-content").append("\
                    <div class='row'>\
                        <div class='col-xs-3'>\
                            <img src='resources/img/question-mark.jpg' class='img-profile'>\
                        </div>\
                        <div class='col-xs-6'>\
                             <span class='error'>" + data.message.split(/'/)[1] + "</span>\
                        </div>\
                        <div class='col-xs-6'>\
                            <p>"+ data.message +"</p>\
                        </div>\
                    </div>"
                );
            // if stream is online
            } else if (data.stream != null) {
                if (data.stream.channel.logo == null) {
                    var logo = "resources/img/question-mark.jpg";
                } else {
                    var logo = data.stream.channel.logo;
                }
                $(".main-content").append("\
                    <div class='row'>\
                        <div class='col-xs-3'>\
                            <img src='"+ logo +"' class='img-profile'>\
                        </div>\
                        <div class='col-xs-9'>\
                            <a href = '"+ data.stream.channel.url +"'>" + data.stream.channel.name + "</a>\
                            <p>" + data.stream.game + ": " + data.stream.channel.status + "</p>\
                        </div>\
                    </div>"
                );
            // if stream is offline
            } else if (data.stream == null) {
                $.getJSON(data._links.channel + "?callback?", function(chnl) {
                    if (chnl.logo == null) {
                        var logo = "resources/img/question-mark.jpg";
                    } else {
                        var logo = chnl.logo;
                    }
                    $(".main-content").append("\
                        <div class='row'>\
                            <div class='col-xs-3'>\
                                <img src='"+ logo +"' class='img-profile'>\
                            </div>\
                            <div class='col-xs-9'>\
                                <a href = '"+ chnl.url +"'>" + chnl.display_name + "</a>\
                                <p class = 'status'>Offline</p>\
                            </div>\
                        </div>"
                    );
                });
            } 
        });
    }
});
    
    