
$(document).ready(function() {
    //  twitter url when quote is not generated yet
    var twitterUrl = 'http://twitter.com/intent/tweet?text=No%20quote%20yet%20%3A(';
    $('#tweet-quote').attr('href', twitterUrl);

    $("#getQuote").on("click", function(){
        // $(".message").html("Here is the message");
        var quoteText;
    $.getJSON("https://raw.githubusercontent.com/gatezh/FreeCodeCamp/master/Intermediate%20Front%20End%20Development%20Projects/Build%20a%20Random%20Quote%20Machine/myQuotes.json", function(json) {
            var html = "";
            var maxQuoteId = json.length - 1;
            // console.log("max quote id is " + maxQuoteId);
            var randomId = Math.floor(Math.random() * (maxQuoteId - 0 + 1)) + 0;
            // console.log("random Id is " + randomId);
            json = json.filter(function(val) {
                return val.id === randomId;
            });

            json.forEach(function(val) {
                quoteText = val.quote + " " + val.author;
                  
                html += "<div class='quote-body'>";
                html += "<span id='quote'>" + val.quote + "</span>";
                html += "</div>";

                html += "<div class='quote-author'>";
                html += "<span id='author'>" + ' ' + val.author + "</span>";
                html += "</div>";
            });
        $(".quote").html(html);
        
        var twitterUrl = 'http://twitter.com/intent/tweet?text=';
        var urlFriendlyQuote = encodeURIComponent(quoteText);
        // console.log(urlFriendlyQuote); 
        $('#tweet-quote').attr('href', twitterUrl + urlFriendlyQuote);
        });
    });
});