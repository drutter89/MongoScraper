/* global bootbox */
$(document).ready(function () {
  // Setting a reference to article-container div where all the dynamic content will go 
  // Adding event listeners to any dynamically generated "save article"
  // and "scrape new article" buttons
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  // Once the page is ready, run the Init function to kick things off
  initPage();

  function initPage() {
    // Empty the article container, run an AJAX request for any unsaved headlines 
    articleContainer.empty();
    $.get("/api/headlines?saved=false")
      .then(function (data) {
        // If we have headlines, render them to the page
        if (data && data.length) {
          renderArticles(data);
        } else {
          //Otherwise display a message stating we have no articles
          renderEmpty();
        }
      });
  }

  function renderArticles(articles) {
    // This function handles appending HTML containing our article data to the page
    // We are passed an array of JSON containing all available articles in our database
    var articles = [];
    // We pass each article JSON object to the createPanel function which returns a bootstrap
    // Panel with our article data inside
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    // Once we have all of the html for the articles 
    // append them
    articleContainer.append(articlePanels);
  }

})