var map;
var tLat = 35.6895;
var tLng = 139.6917;
var pos;
var centWin;
var arr = [];

function getLocation() {
  var save;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
   
      centWin.setPosition(pos);
      centWin.setContent('Location found.');
      centWin.open(map);
      map.setCenter(pos);
      arr.push(position.coords.latitude, position.coords.longitude);
      });
    } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, centWin, map.getCenter());
    pos = {
              lat: tLat,
              lng: tLng
            };
    }
}

console.log(arr);

function initMap() {
  getLocation();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: tLat, lng: tLng},
    zoom: 14
  });
  centWin = new google.maps.InfoWindow;

  // try to set center with geolocation, not set numbers.   DONE!  
    

function handleLocationError(browserHasGeolocation, centWin, pos) {
  centWin.setPosition(pos);
  centWin.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  centWin.open(map);
}





  /////////////////////////////////////
  // setting a marker upon clicking. //
  ////////////////////////////////////

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = iconBase + 'library_maps.png';
  var floaty = document.getElementById('floaty');
  var moreicons = iconBase + 'info-i_maps.png';
  var contentBox = "<h1>Hello World it me</h1>"
  var infowindow = new google.maps.InfoWindow({
    content: contentBox
  });

  map.addListener('click', function(loc) {
    console.log('first');
    placeMarker(loc.latLng, map);
  }) 

  function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      icon: moreicons,
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    })
  }

  //  setting a custom marker upon double clicking

  map.addListener('rightclick', function(loc) {
    console.log('second');
    placeParkMarker(loc.latLng, map);
  }) 

  function placeParkMarker(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      icon: icons,
      map: map
    });
    console.log(latLng);
  }

function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Place Marker';
  controlUI.appendChild(controlText);


  controlUI.addEventListener('click', function() {

    floaty.style.zIndex = 10;
    // make box pop up here with good or bad option 
    // optional picture update
    // later this will interface with db

  });
}

var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function submission() {
    // event.preventDefault();
    // $.ajax({
    //   url: '/getAll',
    //   type: 'POST',
    //   data: {
    //       userId: 'example',
    //       goodOr: false
    //    },
    //   success: function(msg) {
    //     console.log(this.data);
    //     // alert('Email Sent');
    //   },
    //   error: function(err) {
    //     console.log(err);
    //   }               
    // });

    floaty.style.zIndex = -10;
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = iconBase + 'library_maps.png';
    var ok = document.getElementsByName('goodOr')[0];
    console.log('ehlpme');
    var myLatLng = {lat: arr[0], lng: arr[1]}; 
    if (ok.value === "yes") {
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    } else if (ok.value === "no") {
      var marker = new google.maps.Marker({
        position: myLatLng,
        icon: icons,
        map: map,
        title: 'Hello World!'
      });
    } else {
      console.log('haha');
    }

  }
