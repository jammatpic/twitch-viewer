var streamers  = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "ESL_SC2", "OgamingSC2", "sheevergaming", "brunofin"];

// stream.game - game, stream.viewers - viewers, channel.status - detailed info about stream, e.g. teams playing,

// iterate through channels, and display links, profile, and game and status info

// add search bar, sorting by on/offline for fun

$(document).ready(function() {
    for (var user in streamers) {
        $.getJSON("https://api.twitch.tv/kraken/streams/" + streamers[user] + "?callback=?", function(data) {
            // if account does not exist
            if (data.error) {
                $(".main-content").append("\
                    <row>\
                        <div class='col-sm-4'>\
                             <p>" + data.message.split(/'/)[1] + "</p>\
                        </div>\
                        <div class='col-sm-8'>\
                            <p>"+ data.message +"</p>\
                        </div>\
                    </row>"
                );
            // if stream is online
            } else if (data.stream != null) {
                $(".main-content").append("\
                    <row>\
                        <div class='col-sm-4'>\
                            <a href = '"+ data.stream.channel.url +"'>" + data.stream.channel.name + "</a>\
                        </div>\
                        <div class='col-sm-8'>\
                            <p>" + data.stream.game + ": " + data.stream.channel.status + "</p>\
                        </div>\
                    </row>"
                );
            // if stream is offline
            } else if (data.stream == null) {
                $.getJSON(data._links.channel + "?callback?", function(chnl) {
                    $(".main-content").append("\
                        <row>\
                            <div class='col-sm-4'>\
                                <a href = '"+ chnl.url +"'>" + chnl.display_name + "</a>\
                            </div>\
                            <div class='col-sm-8'>\
                                <p>Offline</p>\
                            </div>\
                        </row>"
                    );
                });
            } 
        });
    }
});
    
    