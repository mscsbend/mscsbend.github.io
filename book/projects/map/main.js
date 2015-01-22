(function(){
  window.addEventListener("load", function() {
    var element = document.querySelector("#location");
    var map = document.querySelector("#map");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.status === 200) {
        if(request.readyState === 4) {
          var location = request.response;
          element.innerText = "[" + location.ip + "] " 
            + location.city + " " 
            + location.region_code + ", " 
            + location.country_code;
          map.innerText = "generating map..."
          loadMap(location, map, element.innerText);
        }
      } else if (request.status === 0) {
        element.innerText = "loading...";
      } else {
        element.innerText = "unknown";
        map.innerText = "";
      } 
    };
    element.innerText = "requesting...";
    request.open("GET", "http://freegeoip.net/json/");
    request.responseType = "json";
    request.send();
  });
  
  var loadMap = function(location, element, title) {
    var latlng = new google.maps.LatLng(location.latitude, location.longitude);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    var map = new google.maps.Map(element, mapOptions);
  
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: title
    });
  };
}());