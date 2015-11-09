var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    function addMarker(map, address, title) {
     geocoder = new google.maps.Geocoder();
     geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
     position: results[0].geometry.location,
              map: map,
              title:title
    });
    google.maps.event.addListener(marker, 'click', function() {
     var infowindow = new google.maps.InfoWindow();
            infowindow.setContent('<strong>'+title + '</strong><br />' + address);
             infowindow.open(map, marker);

          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
     });
    }
    addMarker(map, 'Address', 'Title');
 addMarker(map, 'Address', 'Title');