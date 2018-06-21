




$(document).ready(function(){
  $.ajax(ajax);
});

var ajax = {
  url: '/search/getAll',
  type: 'get',
  dataType: 'json',
  success: function(searches) {
    console.log(searches);
    for (var i = 0; i < searches.length; i++) {
      if (searches[i].found){
      $('#foundSearches').append('<li>' + searches[i].query + '</li>');
      console.log(searches[i].query);
      }
      else {
      $('#notFoundSearches').append('<li span style="color:#38b6a0">' + searches[i].query + '</li>');
      }
    }
  },
  error: function(err) {
    console.log(err);
  }
}


      $('#submit').click(function(event) {
        event.preventDefault();
        $.ajax({
          url: '/search/getAll',
          type: 'POST',
          data: {
              email: 'email@example.com',
              message: 'hello world!'
          },
          success: function(msg) {
            alert('Email Sent');
          },
          error: function(err) {
            console.log(err);
          }               
        });
      });
