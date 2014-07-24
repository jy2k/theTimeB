$(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            position.coords.latitude +
            "," +
            position.coords.longitude
      ,
      function(res) {
        $('input[name="address"]').val(res.results[0].formatted_address);
      })
    });
  }
});
