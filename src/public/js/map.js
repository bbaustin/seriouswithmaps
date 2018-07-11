var map,
    tLat = 35.6895,
    tLng = 139.6917,
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
    changed = false;
    



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

      //LATER, make loading screen until this happens. 
      map.setCenter(pos);
      arr.push(position.coords.latitude, position.coords.longitude);
      initialLocation.push(position.coords.latitude, position.coords.longitude)
      $('.two').append('<p id="lat2">'+arr[0]+'</p><p id="long2">'+arr[1]+'</p>'); //7/6: do I still need this? 

      latHolder.value=arr[0];
      longHolder.value=arr[1];
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
  var floaty = document.getElementById('floaty');
  var contentBox = "<small>Hello World it me</small>"
  var infowindow = new google.maps.InfoWindow({
    content: contentBox
  });


  ////////////////
  //   CLICK!  // 
  //////////////

  function makeSureOneYellow() {
    console.log(changed);
    if (changed && marker) {
      marker.setMap(null);
    }
  }


  map.addListener('click', function(loc) {
    changed=true;
    makeSureOneYellow();
    placeMarker(loc.latLng, map);
    

    latHolder.value=loc.latLng.lat();
    arr[0] = loc.latLng.lat();
    longHolder.value=loc.latLng.lng();
    arr[1] = loc.latLng.lat(); 
  }) 

  function placeMarker(latLng, map) {
    // makeSureOneYellow();
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: true,
      icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'//,
      // title: 'Hello World!', 
      //testThing: 123 //actually works? 
    });
    marker.setZIndex(99999);
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    })
    marker.addListener('dragend', function(marker) {
      latHolder.value=marker.latLng.lat();
      arr[0] = marker.latLng.lat();
      longHolder.value=marker.latLng.lng();
      arr[1] = marker.latLng.lng(); 

      // console.log('latHolder.value: ' + latHolder.value + ', arr[0]: ' + arr[0] + ', marker.latLng.lat(): ' + marker.latLng.lat());
      // console.log('longHolder.value: ' + longHolder.value + ', arr[1]: ' + arr[1] + ', marker.latLng.lat(): ' + marker.latLng.lng());

    })
  }

  controlUI.addEventListener('click', function() {
    var myLatLng;
    console.log(counter);

    //CLICKING FOR FIRST TIME, BEFORE A YELLOW MARKER IS SET//
      // makeSureOneYellow();
      // myLatLng = {lat: arr[0], lng: arr[1]}; //totally unneeded here, i think
      // placeMarker(myLatLng, map);  // do NOT place new marker.
      // changed=true;
      controlText.style.backgroundColor = "yellow";
      counter++;
      floaty.style.zIndex = 10;

      // console.log('latHolder.value: ' + latHolder.value + ', arr[0]: ' + arr[0] + ', marker.latLng.lat(): ' + marker.latLng.lat());
      // console.log('longHolder.value: ' + longHolder.value + ', arr[1]: ' + arr[1] + ', marker.latLng.lat(): ' + marker.latLng.lng());
    });
    // else {
    //   myLatLng = {lat: initialLocation[0], lng: initialLocation[1]};
    //   placeMarker(myLatLng, map);
    //   counter++;
    // }

  $('h1').on('click', function() {  //recenter marker
    var myLatLng;
    makeSureOneYellow();
    myLatLng = {lat: initialLocation[0], lng: initialLocation[1]}; //totally unneeded here, i think
    latHolder.value=initialLocation[0];
    arr[0] = initialLocation[0];
    longHolder.value=initialLocation[1];
    arr[1] = initialLocation[1];

    placeMarker(myLatLng, map);  // do NOT place new marker.
    changed=true;
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
  controlUI.className += 'temp';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Confirm location';
  controlUI.appendChild(controlText);
}
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function submission() {
    floaty.style.zIndex = -10;
    var ok = document.getElementsByName('goodOr')[0];
    var myLatLng = {lat: arr[0], lng: arr[1]}; 

    if (ok.value === "yes") {
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map, 
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
      marker.setZIndex(99999);
      console.log(marker.position);
    } else if (ok.value === "no") {
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
      });
      marker.setZIndex(99999);
      console.log(marker.position);
    } else {
      console.log('haha');
    }
  }








///GRAVEYARD

// after the counter % 2 = 0 thing: 

      // var marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: map,
      //   title: 'Hello World!', 
      //   draggable: true,
      //   icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      //   testThing: 123 //actually works? 
      // });



  // function placeParkMarker(latLng, map) {
  //   var marker = new google.maps.Marker({
  //     position: latLng,
  //     icon: icons,
  //     map: map
  //   });
  //   console.log(latLng.lat);
  // }


  //  setting a custom marker upon double clicking

  // map.addListener('rightclick', function(loc) {
  //   console.log('second');
  //   placeParkMarker(loc.latLng, map);
  // }) 



// google.maps.event.addListener(m, 'dragend', function(ev){
//     alert(ll.lat() + ' ' + ll.lng()); // always the same LatLng-Object...
//     alert(m.getPosition()); // new LatLng-Object after dragend-event...
// });




//RYO CODE
    // Less is more. 

    // //Single Responsibility Principle 
    // function() {
    //   var hoge = 1;
    //   function countUp(count) {
    //     return count + 1;
    //   } 
    //   return countUp(hoge);
    // }
    // var Bar = {
    //   countDown: function(count) { return count - 1 ;},
    // }
    // Bar.countDown(hoge); // => 0

