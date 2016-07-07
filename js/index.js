/* Colors to chose */
availableColors = {
  1: "rgb(120,0,238)",
  2: "rgb(0,162,81)",
  3: "rgb(238,0,118)",
  4: "rgb(238,1,0)",
  5: "rgb(238,120,0)",
  6: "rgb(161,162,0)",
  7: "rgb(0,118,238)",
  8: "rgb(0,161,162)"
};

/* Execute when DOM is ready */
$(document).ready(function() {
  /* Wait 1 sec until first quote */
  setTimeout(function(){ 
    reloadQuote(); 
  }, 1000);
  
  /* Reload quote event */
  $("#new-quote-btn").on("click", function(){
    reloadQuote(); 
  });
});

/* Reload the quote */
function reloadQuote() {
  drawRandomQuote();
}

/* Get the Random Quote */
function drawRandomQuote() {
  $.ajax({
    method: "POST",
    headers: {
      "X-Mashape-Key": "G1YzrkTGytmshHZhl5M7uZN1oZh1p1IPE3OjsnPqKJxKNo4N3q",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
    success: function(response){
      var quoteJson = JSON.parse(response);
      var quoteStr = quoteJson.quote;
      var quoteAuthor = quoteJson.author;
      clearHtmls();
      showQuote(quoteStr, quoteAuthor);
      setUpTwitter(quoteStr, quoteAuthor);
      changeBackgroundColor();
    }
  });
}

function setUpTwitter(quote, author) {
  var twitterURL = "https://twitter.com/intent/tweet?";
  var hashtags = "hashtags=RandomQuote,FreeCodeCamp";
  var preText = encodeURIComponent(quote + ' | ' + author);
  var text = "text=" + preText;
  var content = twitterURL + hashtags + "&" + text;
  $("#tweet-btn").attr("href", content);
}

/* Show the quote in the HTML */
function showQuote(quote, author) {
  var mainQuote = $("#main-quote");
  var mainQuoteText = $("#main-quote-text");
  var splashWrapper = $("#splash-wrapper");
  var mainActionsWrapper = $("#main-actions-wrapper");
  var authorWrapper = $("#author-wrapper");
  splashWrapper.addClass("hidden");
  authorWrapper.html("| " + author);
  mainQuoteText.html(quote);
  mainQuote.removeClass("hidden");
  mainActionsWrapper.removeClass("hidden");
  authorWrapper.removeClass("hidden");
}

function clearHtmls() {
  var mainQuote = $("#main-quote");
  var mainQuoteText = $("#main-quote-text");
  var splashWrapper = $("#splash-wrapper");
  var mainActionsWrapper = $("#main-actions-wrapper");
  var authorWrapper = $("#author-wrapper");
  splashWrapper.removeClass("hidden");
  authorWrapper.html("");
  mainQuoteText.html("");
  mainQuote.addClass("hidden");
  mainActionsWrapper.addClass("hidden");
  authorWrapper.addClass("hidden");
}

/* Change random color */
function changeBackgroundColor(){
  var randomNum = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
  var newColor = availableColors[randomNum];
  $("body").animate({
    backgroundColor: newColor
  }, 100);
}

/* Purify quote */
function purifyQuote(html){
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}