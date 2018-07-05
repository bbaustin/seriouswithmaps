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
      if (locations[i].loc[0].lat && locations[i].loc[0].lng){
        // Propagates already-set markers on the map  
        console.log(locations[i].loc[0].lat + " " + locations[i].loc[0].lng);
        if (locations[i].goodOr) {  // checks if it's YES (GREEN) ...
          var marker = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', 
            position: {lat: locations[i].loc[0].lat, lng: locations[i].loc[0].lng},
            map: map,  
            title: locations[i].loc[0].lat + " " + locations[i].loc[0].lng
          })
        }
        else {  // ... or NO (RED)
          var marker = new google.maps.Marker({
            position: {lat: locations[i].loc[0].lat, lng: locations[i].loc[0].lng},
            map: map,  
            title: locations[i].loc[0].lat + " " + locations[i].loc[0].lng
          })
        }

      }
    }
  },
  error: function(err) {
    console.log(err);
  }
};

// var ajax2 = {
//           url: '/',
//           type: 'POST',
//           dataType: 'json',
//           success: function(msg) {
//             alert('Email Sent');
//             console.log($('.tester'));
//             console.log(msg);
//           },
//           error: function(err) {
//             console.log(err);
//           }               
//         };


// $('#submit').click(function(event) {
//   $.ajax(ajax2);
// });
