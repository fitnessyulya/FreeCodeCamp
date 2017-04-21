
function searchWiki() {
    var searchValue = document.searchform.searchinput.value;
    var url = "https://crossorigin.me/http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchValue;

    var results = document.getElementById("router-outlet");
    results.innerHTML = "";

    var waiting = document.createElement("div");
    waiting.id = "waiting";
    waiting.innerHTML = '<img class="col-md-4 text-center align-self-center" src="http://www.cuisson.co.uk/templates/cuisson/supersize/slideshow/img/progress.BAK-FOURTH.gif">';
    document.getElementById("router-outlet").appendChild(waiting);

    var articles = document.createElement("div");
    articles.id = "articles";
    articles.className = "articles";
    document.getElementById("router-outlet").appendChild(articles);

    $.getJSON(url, function (data) {

        var numOfArticles = data[1].length;

        for (var i=0; i < numOfArticles; i++) {

            var article = document.createElement("a");
            article.className = "article";
            article.href = data[3][i];
            article.target = "_blank";

            var matchTitle = document.createElement("div");
            matchTitle.className = "match-title";
            matchTitle.innerHTML = "<h3>" + data[1][i] + "</h3>";
            article.appendChild(matchTitle);

            var matchPreview = document.createElement("div");
            matchPreview.className = "match-preview";
            matchPreview.innerHTML = data[2][i];
            article.appendChild(matchPreview);

            articles.appendChild(article);

        }
        waiting.innerHTML = "";
    });

    return false;
}
