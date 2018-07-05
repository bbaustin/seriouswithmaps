var map;
var tLat = 35.6895;
var tLng = 139.6917;
var pos;
var centWin;
var arr = [];
var dummy = []; 

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
      centWin.open(map);

      //LATER, make loading screen until this happens. 
      map.setCenter(pos);
      arr.push(position.coords.latitude, position.coords.longitude);
      $('.two').append('<p id="lat2">'+arr[0]+'</p><p id="long2">'+arr[1]+'</p>');

      document.getElementById('lat1').value=arr[0];
      document.getElementById('long1').value=arr[1];
      // document.forms[0].submit()

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


function initMap() {
  getLocation();
  map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: tLat, lng: tLng},    // LOADING SCREEN INSTEAD OF
    zoom: 19
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


  ////////////////
  //   CLICK!  // 
  //////////////
  map.addListener('click', function(loc) {
    placeMarker(loc.latLng, map);
    document.getElementById('lat1').value=loc.latLng.lat();
    document.getElementById('long1').value=loc.latLng.lng();
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



  // function placeParkMarker(latLng, map) {
  //   var marker = new google.maps.Marker({
  //     position: latLng,
  //     icon: icons,
  //     map: map
  //   });
  //   console.log(latLng.lat);
  // }

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
  controlUI.title = 'Place a parking marker';
  controlUI.className += 'temp';
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

  var counter = 0; 
  controlUI.addEventListener('click', function() {
    var myLatLng = {lat: arr[0], lng: arr[1]};
    console.log(counter%2);

    //////////////////////////////////////////////////////////
    //CLICKING FOR FIRST TIME, BEFORE A YELLOW MARKER IS SET//
    //////////////////////////////////////////////////////////
    if (counter%2===0) {
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!', 
        draggable: true,
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        testThing: 123 //actually works? 
      });
      marker.className += 'changeFromYellow'; //not quite working 
      dummy.push[marker];
      console.log(dummy[0]);
      marker.setZIndex(99999); //works
      /////////////
      //DRAGGING!//
      /////////////
      marker.addListener('dragend', function(marker) {
        console.log(marker.latLng.lat() + ' ' + marker.latLng.lng());
        document.getElementById('lat1').value=marker.latLng.lat();
        arr[0] = marker.latLng.lat();
        document.getElementById('long1').value=marker.latLng.lng();
        arr[1] = marker.latLng.lng(); 
      })


      controlText.innerHTML = 'Location OK?';
      controlText.style.backgroundColor = "yellow";
      counter++;

    } 
    else {
      floaty.style.zIndex = 10;
      // marker.draggable = false; //this doesn't work but not a huge issue. 
      counter++;
      $('.temp').css('display', 'none');
      // controlUI.style.display = 'none';
    }
    // make box pop up here with good or bad option 
    // optional picture update
    // later this will interface with db

  });
}




// google.maps.event.addListener(m, 'dragend', function(ev){
//     alert(ll.lat() + ' ' + ll.lng()); // always the same LatLng-Object...
//     alert(m.getPosition()); // new LatLng-Object after dragend-event...
// });

var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function submission() {
    floaty.style.zIndex = -10;
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = iconBase + 'library_maps.png';
    var ok = document.getElementsByName('goodOr')[0];
    var myLatLng = {lat: arr[0], lng: arr[1]}; 

    console.log(document.body.getElementsByClassName('temp')[0]); //undefined
    $('.temp').css('display', 'initial'); 

    //I want yellow to disappear and red or green marker to be created
    //OK Right now it's adding greenYES or library(???)NO markers when you submit.
    //IN the "you are here" location.
    // So you need to update the location to the dragged location. 
    //I'm sure there's a DRY way to do this.  
    // $('.changeFromYellow').css('display', 'none');

    //RN I'm just putting it on top of the yellow marker. That's OK?

    if (ok.value === "yes") {
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!', 
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
      marker.setZIndex(99999);
    } else if (ok.value === "no") {
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
      marker.setZIndex(99999);
    } else {
      console.log('haha');
    }
    console.log(arr);
    // controlUI.style.display = 'initial';    Out of scope 
  }








///GRAVEYARD


  //  setting a custom marker upon double clicking

  // map.addListener('rightclick', function(loc) {
  //   console.log('second');
  //   placeParkMarker(loc.latLng, map);
  // }) 

