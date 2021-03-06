var map,
    pos,
    arr = [],
    initialLocation = [],
    marker,
    controlUI = document.createElement('div'),
    controlText = document.createElement('div'),
    secondUI = document.createElement('div'),
    secondText = document.createElement('div'),
    counter = 0,
    latHolder = document.getElementById('lat1'),
    longHolder = document.getElementById('long1'),
    changed = false,
    yellowArray = [];
    

function createYellowMarker(pos) {
  marker = new google.maps.Marker({
    position: pos,
    map: map,
    draggable: true,
    icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: 'black',
              fillOpacity: 1,
              strokeColor: 'rgba(254, 183, 9, 0.82)'
          },
    zIndex: 99999
  });
  yellowArray.push(marker);




  marker.addListener('dragend', function(marker) {
    latHolder.value  = marker.latLng.lat();
    arr[0]           = marker.latLng.lat();
    
    longHolder.value = marker.latLng.lng();
    arr[1]           = marker.latLng.lng(); 
  });

  return marker;
}






function getLocation() {
  var save;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

  createYellowMarker(pos);
  // MAKE THIS NOT HAPPEN EVERY TIME YOU CLICK 
    var welcomeContent = "<h3>Hello!</h3><p>This is where you are. Click or drag to finetune your location.</p> <p>When you're ready to submit a location, press the blinking button above.</p>";
    var welcomeWindow  = new google.maps.InfoWindow({
      content: welcomeContent
    });
    welcomeWindow.open(map, marker);



      

      //LATER, make loading screen until this happens. 
      map.setCenter(pos);
      arr.push(position.coords.latitude, position.coords.longitude);
      initialLocation.push(position.coords.latitude, position.coords.longitude)

      latHolder.value  = arr[0];
      longHolder.value = arr[1];
    });
  } 
  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
    pos = {
      lat: 35.689487,
      lng: 139.691706
    };
  }
}

function initMap() {
  getLocation();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 19,
    disableDefaultUI: true
  });

  centWin = new google.maps.InfoWindow;



  var ajax = {
  url: '/getAll',
  type: 'get',
  dataType: 'json',
  beforeSend: function() {
    $('.loading').css('display', 'initial'); 
  },
  success: function(locations) {
    // console.log(locations[1]);
    var markers = [];
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].loc[0].lat && locations[i].loc[0].lng){
        markers.push(locations[i]); // 7/6: Not sure if needed. Might be useful to access all markers from front end. Hide all, etc. 
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
                infowindow.setContent("<h3 style='text-align:center;color=rgba(91, 214, 191, 1);'>Good parking spot!</h3><ul><li>Date: " + markers[i].time.slice(0, 10) + "</li><li>Time: " + markers[i].time.slice(11, 16) + "</li></ul>");
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
                var biketicket = "", 
                    bikestolen = "";
                if (markers[i].ticket) {
                  biketicket = "<li>Bike was ticketed!</li>";
                }
                if (markers[i].stolen) {
                  bikestolen = "<li>Bike was taken!</li>";
                }
                infowindow.setContent("<h3>Bad Parking Spot!</h3><ul>" + biketicket + bikestolen + "<li>Date: " + markers[i].time.slice(0, 10) + "</li><li>Time: " + markers[i].time.slice(11, 16) + "</li>");
              }
            }
            infowindow.open(map, this);
          })
        }

      }
    }
  },
  complete: function() {
    $('.loading').fadeOut(1000, 'swing', function () {
      $('.loading').remove();
    });
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
  var welcomeContent = "<h3>Hello!</h3><p>This is where you are. Click or drag to finetune your location.</p> <p>When you're ready to submit a location, press the blinking button above.</p>";
  var welcomeWindow  = new google.maps.InfoWindow({
    content: welcomeContent, 
    maxWidth: '100px'
  });


  function makeSureOneYellow() {
    console.log('changed: ' + changed);
    if (changed && marker) {
      marker.setMap(null);
    }
  }


  map.addListener('click', function(loc) {
    changed=true;
    makeSureOneYellow();
    createYellowMarker(loc.latLng);
    
    latHolder.value=loc.latLng.lat();
    arr[0] = loc.latLng.lat();
    longHolder.value=loc.latLng.lng();
    arr[1] = loc.latLng.lng(); 
  }) 


  controlUI.addEventListener('click', function() {
    var myLatLng;
      counter++;
      floatyHolder.style.zIndex = 10;
      
      // RESETTING THE FORM
      $('.presser').removeClass('pressedt');
      $('.presser').removeClass('pressedp');
      $('.additionalOptions').css('display', 'none');
      document.getElementsByName('goodOr')[0].value = "";
      document.getElementsByName('ticket')[0].value = "";
      document.getElementsByName('stolen')[0].value = "";
    });

  $(secondUI).on('click', function() {  //recenter marker
    var myLatLng;
    changed=true;
    makeSureOneYellow();
    myLatLng = {lat: initialLocation[0], lng: initialLocation[1]}; //totally unneeded here, i think
    latHolder.value=initialLocation[0];
    arr[0] = initialLocation[0];
    longHolder.value=initialLocation[1];
    arr[1] = initialLocation[1];
    map.setCenter({lat: arr[0], lng: arr[1]});
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
  controlText.style.color = 'rgba(250,250,250,1)';
  controlText.style.fontFamily = 'Muli,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.style.marginTop = '40px';
  controlText.innerHTML = 'Confirm location';
  controlUI.appendChild(controlText);
  $(controlUI).addClass('color-change');
}
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);



function SecondControl(secondDiv, map) {
  // Set CSS for the control border.
  secondUI.style.backgroundColor = '#fff';
  secondUI.style.border = '2px solid #fff';
  secondUI.style.borderRadius = '3px';
  secondUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  secondUI.style.cursor = 'pointer';
  secondUI.style.marginBottom = '22px';
  secondUI.style.textAlign = 'center';
  secondUI.title = 'Reset Location';
  secondDiv.appendChild(secondUI);

  // Set CSS for the control interior.
  secondText.style.color = 'rgb(25,25,25)';
  secondText.style.fontFamily = 'Muli,Arial,sans-serif';
  secondText.style.fontSize = '16px';
  secondText.style.lineHeight = '38px';
  secondText.style.paddingLeft = '5px';
  secondText.style.paddingRight = '5px';
  secondText.style.marginTop = '0px';
  secondText.innerHTML = 'Reset Location';
  secondUI.appendChild(secondText);
}
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  var secondControlDiv = document.createElement('div');
  var secondControl = new SecondControl(secondControlDiv, map);
  secondControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(secondControlDiv);



}

function submission() {
    var floatyHolder = document.getElementsByClassName('floatyholder')[0];
    var ok  = document.getElementsByName('goodOr')[0];
    // var ok2 = document.getElementsByName('ticket')[0];
    // var ok3 = document.getElementsByName('stolen')[0];
    var myLatLng = {lat: arr[0], lng: arr[1]}; 
    var thanksContent = "<h3>Thanks for submitting!</h3>";
    var thanksWindow  = new google.maps.InfoWindow({
      content: thanksContent
    });




    if (ok.value === "true") {
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
      floatyHolder.style.zIndex = -10;
      changed = true;
      yellowArray[yellowArray.length-1].setMap(null);

    } else if (ok.value === "false") {
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
      floatyHolder.style.zIndex = -10;
      changed = true;
      yellowArray[yellowArray.length-1].setMap(null); 

    } else {
      $('#floaty h1').text('Please select Yes or No');
    }
    thanksWindow.open(map, marker);
  }

$('nav p:first-child').on('click', function() {
  $('.about').css('z-index', 10); 
})

$('.about').on('click',function() {
  $(this).css('z-index', '-10');
})


//definitely dryer way to do this
$('.yes').on('click', function() {
  $(this).addClass('pressedt');
  $(this).next().removeClass('pressedp');

  if ($('.presser').index(this) === 0) {
    $('input')[2].value = true;
    $('.additionalOptions').css('display', 'none');
    document.getElementsByName('ticket')[0].value = "false";  // If you don't do this, the other fields will be blank.
    document.getElementsByName('stolen')[0].value = "false";  // This causes an error in which good parking spots aren't saved. 
  }
  else if ($('.presser').index(this) === 2) {
    $('input')[3].value = true;
  }
  else if ($('.presser').index(this) === 4) {
    $('input')[4].value = true;
  }
})

$('.no').on('click', function() {
  $(this).addClass('pressedp');
  $(this).prev().removeClass('pressedt');

  if ($('.presser').index(this) === 1) {
    $('input')[2].value = false;
  }
  else if ($('.presser').index(this) === 3) {
    $('input')[3].value = false;
  }
  else if ($('.presser').index(this) === 5) {
    $('input')[4].value = false;
  }
  $('.additionalOptions').css('display', 'initial');
})





