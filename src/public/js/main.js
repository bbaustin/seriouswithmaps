// $(document).ready(function(){
//   $.ajax(ajax);
// });


//   var contentBox = "<small>Add backend stuff later</small>" 
//   var infoBox = new google.maps.InfoWindow({
//     content: contentBox
//   });


// var ajax = {
//   url: '/getAll',
//   type: 'get',
//   dataType: 'json',
//   success: function(locations) {
//     // console.log(locations[1]);
//     var markers = [];
//     for (var i = 0; i < locations.length; i++) {
//       if (locations[i].loc[0].lat && locations[i].loc[0].lng){
//         markers.push(locations[i]); // 7/6: Not sure if needed. Might be useful to access all markers from front end. Hide all, etc. 

//         if (locations[i].goodOr) {  // checks if it's YES (GREEN) ...   7/6: Note, this is very similar to the DRYer thing you made in map.js. Is it better to combine into one file so that function is made availble? Or load map.js first in the footer.hbs
//           var marker = new google.maps.Marker({
//             icon: {
//                 path: google.maps.SymbolPath.CIRCLE,
//                 scale: 6,
//                 fillColor: 'black',
//                 fillOpacity: 1,
//                 strokeColor: 'rgba(91, 214, 191, .82)'
//             },            
//             position: {lat: locations[i].loc[0].lat, lng: locations[i].loc[0].lng},
//             map: map,  
//             title: locations[i].loc[0].lat + " " + locations[i].loc[0].lng
//           })
//           // marker.addListener('click', function() {
//           //   infowindow.open(map, marker);
//           // })          
//         }
//         else {  // ... or NO (RED)
//           var marker = new google.maps.Marker({
//             position: {lat: locations[i].loc[0].lat, lng: locations[i].loc[0].lng},
//             icon: {
//               path: google.maps.SymbolPath.CIRCLE,
//               scale: 6,
//               fillColor: 'black',
//               fillOpacity: 1,
//               strokeColor: 'rgba(251, 148, 189, 0.82)'
//             },
//             map: map,  
//             title: locations[i].loc[0].lat + " " + locations[i].loc[0].lng
//           })
//           // add info window thing here 
//         }

//       }
//     }
//   },
//   error: function(err) {
//     console.log(err);
//   }
// };
