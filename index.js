$(function () {   //execute this once the form is submitted
  $('#ytForm').submit(function (e) {
    e.preventDefault(); // prevents form from being submitted
    var q = $('#q').val(); // get the searh term from user 
    var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyD_rNYO2dfWffVJ4iAdJ5Lm4-PdrH4mIBE&q=" + q + "&part=snippet&maxResults=6&type=video";
    $.getJSON(url, function (res) {  //fire the AJAX call
      $('#term').text(q); //update search term and number of results
      $('#num').text(res.pageInfo.totalResults);
      $('#resultsPerPage').text(res.pageInfo.resultsPerPage);
      $('#results-section').prop('hidden', false); //show the search results section
      var item = {}; //go through each result
      for (var i = 0; i < res.items.length; i++) { //loop through the results
        item = res.items[i]; //cache the single item
        $('.master').clone()
          .removeClass('master')
          .find('img').attr({ //update image and alternate text
            'src': item.snippet.thumbnails.high.url,
            'alt': item.snippet.title
          }).end()
          .find('figcaption a').text(item.snippet.title).end()
          .find('a').attr('href', 'https://www.youtube.com/watch?v=' + item.id.videoId).end()
          .appendTo('.results');
      }
    }); 
  });
});