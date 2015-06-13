var mapApp = angular.module('mapApp', []);

mapApp.controller('MapController', ['$scope', '$http', function ($scope, $http) {
    var a = 0;
    $scope.establishments = [];

    var map = null;
    var markers = [];
    var position = null;

    function onWindowResize() {

        $('#map-canvas').height($(document).innerHeight());
        google.maps.event.trigger(map, 'resize');

    }

    $(window).resize(onWindowResize);

    function removeMarkers() {
        for (var x = markers.length - 1; x == 0; x--)
            markers[x].setMap(null);

        markers.length = 0;
        $scope.establishments = [];
    }

    function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }

    function onMapCenterChanged() {
        if (a == 1) return;

        a = 1;

        if (!position || calcDistance(position, map.getCenter()) > 1) {

            position = map.getCenter();
            var lat = position.lat();
            var lng = position.lng();

            /*$http.get('https://api.foursquare.com/v2/venues/explore?section=food&ll=' + lat + ',' + lng + '&client_id=L1W1JQDG0BFMY0SOYFPWGHD2IX4JPEEZFIEMODXRYC5XHUSJ&client_secret=PDM4PTNXOXPD1CLA3JGKHW3LE2XT3GNTUBOBUTNDE1ZA2MM4&v=20150608').success(function (data) {
             if (data) {

             if (data.response) {
             removeMarkers();

             angular.forEach(data.response.groups[0].items, function (row, index) {
             var pos = new google.maps.LatLng(row.venue.location.lat, row.venue.location.lng);
             var marker = new google.maps.Marker({position: pos, title: row.venue.name})
             marker.setMap(map);

             markers.push(marker);

             $scope.establishments.push({
             id: row.venue.id,
             name: row.venue.name,
             address: row.venue.location.address,
             rating: row.venue.rating,
             price: row.venue.price ? row.venue.price.tier : 0
             });
             });

             }
             }
             });*/

            $http.get('/api/@' + lat + ',' + lng + '/.json').success(function (data) {
                if (data) {
                    removeMarkers();

                    angular.forEach(data, function (row, index) {
                        var pos = new google.maps.LatLng(row.lat, row.lng);
                        var marker = new google.maps.Marker({position: pos, title: row.name})
                        marker.setMap(map);

                        markers.push(marker);

                        $scope.establishments.push({
                            id: row.id,
                            name: row.name,
                            address: row.address,
                            rating: row.rating,
                            price: row.price
                        });
                    });
                }
            });
        }
    }

    function initialize() {
        var mapOptions = {
            center: {lat: -34.397, lng: 150.644},
            zoom: 16
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        onWindowResize();

        google.maps.event.addListener(map, 'center_changed', onMapCenterChanged);

        // Try HTML5 geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);

                /*var infowindow = new google.maps.InfoWindow({
                 map: map,
                 position: pos,
                 content: 'Location found using HTML5.'
                 });*/

                map.setCenter(pos);
            }, function () {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }

    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
        } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
        }

        var options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
        };

        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
    }


    google.maps.event.addDomListener(window, 'load', initialize);
}]);