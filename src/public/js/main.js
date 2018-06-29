$(document).ready(function(){
  $.ajax(ajax);
});

var ajax = {
  url: '/getAll',
  type: 'get',
  dataType: 'json',
  success: function(locations) {
    console.log(locations[1]);
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].found){
        $('#foundSearches').append('<li>' + locations[i].query + '</li>');
        console.log(locations[i].query);
      }
      else {
        $('.two').css('background-color', 'white');
      }
    }
  },
  error: function(err) {
    console.log(err);
  }
};

var ajax2 = {
          url: '/',
          type: 'POST',
          dataType: 'json',
          success: function(msg) {
            alert('Email Sent');
            console.log($('.tester'));
            console.log(msg);
          },
          error: function(err) {
            console.log(err);
          }               
        };


$('#submit').click(function(event) {
  $.ajax(ajax2);
});
