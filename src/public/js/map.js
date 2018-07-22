var map,
    pos,
    centWin,
    arr = [],
    initialLocation = [],
    controlUI = document.createElement('div'),
    controlText = document.createElement('div'),
    marker,
    counter = 0,
    latHolder = document.getElementById('lat1'),
    longHolder = document.getElementById('long1'),
    changed = false,
    yellowArray = [];
    

function getLocation() {
  var save;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
   
      centWin.setPosition(pos);
      centWin.setContent('You are here');
      // centWin.open(map);

      marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: true,
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        zIndex: 99999
      });
      yellowArray.push(marker);


      marker.addListener('click', function() {
        // infowindow.open(map, marker);
        console.log(yellowArray[0]);
      })
      marker.addListener('dragend', function(marker) {
        latHolder.value=marker.latLng.lat();
        arr[0] = marker.latLng.lat();
        longHolder.value=marker.latLng.lng();
        arr[1] = marker.latLng.lng(); 
      });

      //LATER, make loading screen until this happens. 
      map.setCenter(pos);
      arr.push(position.coords.latitude, position.coords.longitude);
      initialLocation.push(position.coords.latitude, position.coords.longitude)
      // $('.two').append('<p id="lat2">'+arr[0]+'</p><p id="long2">'+arr[1]+'</p>'); //7/6: do I still need this? 

      latHolder.value=arr[0];
      longHolder.value=arr[1];
      // document.forms[0].submit()

    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, centWin, map.getCenter());
    pos = {
              lat: 35.689487,
              lng: 139.691706
            };
    }
}

function initMap() {
  getLocation();
  map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: tLat, lng: tLng},    // LOADING SCREEN INSTEAD OF
    zoom: 19
  });
  centWin = new google.maps.InfoWindow;



  var ajax = {
  url: '/getAll',
  type: 'get',
  dataType: 'json',
  success: function(locations) {
    // console.log(locations[1]);
    var markers = [];
    for (var i = 0; i < locations.length; i++) {

      
      // console.log(locations[i]);

      if (locations[i].loc[0].lat && locations[i].loc[0].lng){
        markers.push(locations[i]); // 7/6: Not sure if needed. Might be useful to access all markers from front end. Hide all, etc. 
        // console.log(markers);
        var contentBox = "";
        var infowindow = new google.maps.InfoWindow({
          content: contentBox
        });


        if (locations[i].goodOr) {  // checks if it's YES (GREEN) ...   7/6: Note, this is very similar to the DRYer thing you made in map.js. Is it better to combine into one file so that function is made availble? Or load map.js first in the footer.hbs
          var marker = new google.maps.Marker({
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: 'black',
                fillOpacity: 1,
                strokeColor: 'rgba(91, 214, 191, .82)'
            },            
            position: {lat: locations[i].loc[0].lat, lng: locations[i].loc[0].lng},
            map: map,  
            title: locations[i].loc[0].lat + " " + locations[i].loc[0].lng,
            identification: locations[i]._id
          })
          marker.addListener('click', function() {
            console.log(this.identification);
            for (var i = 0; i < markers.length; i++) {
              console.log(markers[i]._id);
              if (markers[i]._id === this.identification) { 
                infowindow.setContent("<ul><li>Latitude: " + markers[i].loc[0].lat + "</li> <li>Longitude: " + markers[i].loc[0].lng + "</li><li>Date: " + markers[i].time.slice(0, 10) + "</li><li>Time: " + markers[i].time.slice(11, 16));
              }
            }
            infowindow.open(map, this);
          })          
        }
        else {  // ... or NO (RED)
          var marker = new google.maps.Marker({
            position: {lat: locations[i].loc[0].lat, lng: locations[i].loc[0].lng},
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: 'black',
              fillOpacity: 1,
              strokeColor: 'rgba(251, 148, 189, 0.82)'
            },
            map: map,  
            title: locations[i].loc[0].lat + " " + locations[i].loc[0].lng,
            identification: locations[i]._id
          })
          marker.addListener('click', function() {
            console.log(this.identification);
            for (var i = 0; i < markers.length; i++) {
              console.log(markers[i]._id);
              if (markers[i]._id === this.identification) { 
                infowindow.setContent("<ul><li>Latitude: " + markers[i].loc[0].lat + "</li> <li>Longitude: " + markers[i].loc[0].lng + "</li><li>Date: " + markers[i].time.slice(0, 10) + "</li><li>Time: " + markers[i].time.slice(11, 16));
              }
            }
            infowindow.open(map, this);
          })
        }

      }
    }
  },
  error: function(err) {
    console.log(err);
  }
};


  function handleLocationError(browserHasGeolocation, centWin, pos) {
    centWin.setPosition(pos);
    centWin.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    centWin.open(map);
  }

  $(document).ready(function(){
    $.ajax(ajax);
  });

  /////////////////////////////////////
  // setting a marker upon clicking. //
  ////////////////////////////////////
  var floaty = document.getElementById('floaty');
  var floatyHolder = document.getElementsByClassName('floatyholder')[0];
  var contentBox = "<small>Add backend stuff later</small>" 
  var infowindow = new google.maps.InfoWindow({
    content: contentBox
  });


  ////////////////
  //   CLICK!  // 
  //////////////

  function makeSureOneYellow() {
    console.log('changed: ' + changed);
    if (changed && marker) {
      marker.setMap(null);
    }
  }


  map.addListener('click', function(loc) {
    changed=true;
    makeSureOneYellow();
    placeMarker(loc.latLng, map);

    
    //PROBLEM HERE? 
    latHolder.value=loc.latLng.lat();
    arr[0] = loc.latLng.lat();
    longHolder.value=loc.latLng.lng();
    arr[1] = loc.latLng.lng(); 
  }) 

  function placeMarker(latLng, map) {
    // makeSureOneYellow();
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: true,
      icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'//,
    });
    marker.setZIndex(99999);
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    })
    yellowArray.push(marker);
    marker.addListener('dragend', function(marker) {
      latHolder.value=marker.latLng.lat();
      arr[0] = marker.latLng.lat();
      longHolder.value=marker.latLng.lng();
      arr[1] = marker.latLng.lng(); 
    })
  }

  controlUI.addEventListener('click', function() {
    var myLatLng;
      controlText.style.backgroundColor = "yellow";
      counter++;
      floatyHolder.style.zIndex = 10;
    });

  $('h1').on('click', function() {  //recenter marker
    var myLatLng;
    changed=true;
    makeSureOneYellow();
    myLatLng = {lat: initialLocation[0], lng: initialLocation[1]}; //totally unneeded here, i think
    latHolder.value=initialLocation[0];
    arr[0] = initialLocation[0];
    longHolder.value=initialLocation[1];
    arr[1] = initialLocation[1];

    placeMarker(myLatLng, map);  // do NOT place new marker.
  })


function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Place a parking marker';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Muli,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.style.marginTop = '40px';
  controlText.innerHTML = 'Confirm location';
  controlUI.appendChild(controlText);
}
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function submission() {
    changed = true;
    yellowArray[yellowArray.length-1].setMap(null); 

    var floatyHolder = document.getElementsByClassName('floatyholder')[0];
    floatyHolder.style.zIndex = -10;
    var ok = document.getElementsByName('goodOr')[0];
    var myLatLng = {lat: arr[0], lng: arr[1]}; 

    if (ok.value === "yes") {
      console.log('yes hit');
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map, 
        icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: 'black',
                fillOpacity: 1,
                strokeColor: 'rgba(91, 214, 191, .82)'
        },
        zIndex: 999999
      });
    } else if (ok.value === "no") {
      console.log('no hit');
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: 'black',
              fillOpacity: 1,
              strokeColor: 'rgba(251, 148, 189, 0.82)'
        },
        zIndex: 999999
      });
    } else {
      console.log('haha');
    }
  }

$('nav p:first-child').on('click', function() {
  $('.about').css('z-index', 10); 
})
  

$('.about').on('click',function() {
  $(this).css('z-index', '-10');
})


var fuck = $('input'[3]);
var fuckk = $('input')[3]; 
//definitely dryer way to do this
$('.yes').on('click', function() {
  console.log($('.presser').index(this));
  // console.log($('.presser')[($('.presser').index(this) + 1)]);
  $(this).toggleClass('pressedt');
  
  if ($('.presser').index(this) === 0) {
    $('input')[2].value = true;
  }
  else if ($('.presser').index(this) === 2) {
    $('input')[3].value = true;
  }
  else if ($('.presser').index(this) === 4) {
    $('input')[4].value = true;
  }

  // if ($(this).hasClass('pressedt')) { 
  //   $('.presser')[($('.presser').index(this) + 1)].removeClass('pressedp');
  // }
  // else {
  //   $('.presser')[($('.presser').index(this) + 1)].addClass('pressedp');
  // }
})

$('.no').on('click', function() {
  console.log($('.presser').index(this));
  console.log($('.presser').index(this) + 1);
  $(this).toggleClass('pressedp');

  if ($('.presser').index(this) === 1) {
    $('input')[2].value = false;
  }
  else if ($('.presser').index(this) === 3) {
    $('input')[3].value = false;
  }
  else if ($('.presser').index(this) === 5) {
    $('input')[4].value = false;
  }
  // if ($(this).hasClass('pressedp')) { 
  //   $('.presser')[0].removeClass('pressedt');
  // }
  // else {
  //   $('.presser')[($('.presser').index(this) - 1)].addClass('pressedt');
  // }



  $('.additionalOptions').css('display', 'initial');
})




