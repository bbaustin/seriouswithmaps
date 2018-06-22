




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
        console.log(locations);
        $('.two').css('background-color', 'white');
      }
    }
  },
  error: function(err) {
    console.log(err);
  }
}


      // $('#submit').click(function(event) {
      //   event.preventDefault();
      //   $.ajax({
      //     url: '/search/getAll',
      //     type: 'POST',
      //     // data: {
      //     //     email: 'email@example.com',
      //     //     message: 'hello world!'
      //     // },
      //     success: function(msg) {
      //       alert('Email Sent');
      //     },
      //     error: function(err) {
      //       console.log(err);
      //     }               
      //   });
      // });
