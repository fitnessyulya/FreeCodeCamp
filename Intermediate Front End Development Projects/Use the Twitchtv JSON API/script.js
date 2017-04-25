
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"];
var apiLink = "https://wind-bow.glitch.me/twitch-api/";
var noLogo = "http://rabota.nure.ua/files/no_logo.gif";

function createChannelsContainer () {
    document.getElementById("router-outlet").innerHTML = "";
    var channelsInfo = document.createElement("div");
    channelsInfo.id = "channels";
    document.getElementById("router-outlet").appendChild(channelsInfo);
}

function parseChannelDetails (channelDetails, streamDetails) {

    var channelWrapper = document.createElement("a");
    channelWrapper.href = channelDetails.url || "https://www.twitch.tv";
    channelWrapper.target = "_blank";

    var channelDiv = document.createElement("div");
    channelDiv.classList.add("channel");

    var channelLogo = document.createElement("img");
    channelLogo.src = channelDetails.logo || noLogo;
    channelDiv.appendChild(channelLogo);

    var channelName = document.createElement("h6");
    channelName.innerHTML = (channelDetails.message)
    ? channelDetails.message
    : channelDetails.display_name;

    channelDiv.appendChild(channelName);

    if (streamDetails.stream) {
        var channelStream = document.createElement("span");
        channelStream.textContent = streamDetails.stream.game
            + " "
            + streamDetails.stream.channel.status;
        channelDiv.appendChild(channelStream);
    }

    channelDiv.classList.add((streamDetails.stream) ? "online"
        : (channelDetails.error) ? "not-exist" : "offline");
    channelWrapper.appendChild(channelDiv);
    document.getElementById("channels").appendChild(channelWrapper);
}

window.onload = function () {

    createChannelsContainer();

    channels.forEach(channel => {
        var channelLink = apiLink + "channels/" + channel + "?callback=?";
        var streamLink = apiLink + "streams/" + channel + "?callback=?";

        $.getJSON(channelLink, function (data) {
            $.getJSON(streamLink, function (stream) {
                parseChannelDetails(data, stream);
            })
        });
    })
};

function displayChannels (status) {
    if (status === "all") {
        document.querySelectorAll(".channel")
            .forEach(div => div.classList.remove("hidden"));
    } else if (status === "on Air") {
        document.querySelectorAll(".offline, .not-exist")
            .forEach(div => div.classList.add("hidden"));
        document.querySelectorAll(".online")
            .forEach(div => div.classList.remove("hidden"));
    } else {
        document.querySelectorAll(".online, .not-exist")
            .forEach(div => div.classList.add("hidden"));
        document.querySelectorAll(".offline")
            .forEach(div => div.classList.remove("hidden"));
    }
}
