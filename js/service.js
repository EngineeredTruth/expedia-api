angular.module('app').service('apiService', function($http) {

        this.getInfo = function(city) {
            return $http({
                method: 'GET',
                url: 'http://terminal2.expedia.com:80/x/activities/search?location=' + city + '&startDate=2015-08-08&endDate=2015-08-18',
                headers: {
                    'Authorization': "expedia-apikey key=Gs5f57HizzNlsmMnjcBsZycviUmvHvJP"
                }
            });
        };

    })
    .service('priceService', function() {

        this.getMaxMin = function(array) {
            var arrayPrices = [];

            for (var i = 0; i < array.length; i++) {
                arrayPrices.push(array[i].fromPrice);
            }

            arrayPrices.sort(function(a, b) {
                return a - b;
            });

            var prices = {};
            prices.min = arrayPrices[0];
            prices.max = arrayPrices[arrayPrices.length - 1];
            return prices;

        }

    })
    .service('mapService', function() {

        this.map;

        this.initMap = function(latX, longX) {

            this.map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: latX,
                    lng: longX
                },
                zoom: 10
            });

            var marker = new google.maps.Marker({
                map: this.map,
                position: {
                    lat: latX,
                    lng: longX
                },
                title: 'Hello World!'
            })
        };

        this.makeMarkers = function(x) {
                //x is the expedia api call promise
                //results will be the our lat and lon object
                var results = [];
                // this for loop splits the latlng property from expedia,
                //parses into a float then pushes it onto the results array
                for (var i = 0; i < x.length; i++) {
                    var position = {};
                    var coords = x[i].latLng.split(',');
                    position.lat = parseFloat(coords[0]);
                    position.lng = parseFloat(coords[1]);

                    results.push(position);
                }

                // this next loop creates a new marker for every lat & lon
                // in the results array, and gives it the title Hello World
                for (var j = 0; j < results.length; j++) {
                    // console.log(x[j].categories);
                    var infoWindow = new google.maps.InfoWindow({
                        content: '<div class="marker-container"><p class="marker">' + x[j].title + "<br><span class='marker-price'>$" + x[j].fromPrice +
                            '</span></p><img class="marker-img" src=' + x[j].imageUrl + '></div>',
                        maxWidth: 200
                    });
                    var icon = '';
                    switch (x[j].categories[0]) {
                        case 'Attractions':
                            icon = 'imgs/icons/attractions.png';
                            break;
                        case 'Nightlife':
                            icon = 'imgs/icons/bar_coktail.png';
                            break;
                        case 'Private Transfers':
                            icon = 'imgs/icons/taxi.png';
                            break;
                        case 'Shared Transfers':
                            icon = 'imgs/icons/taxi.png';
                            break;
                        case 'Walking & Bike Tours':
                            icon = 'imgs/icons/walkingtours.png';
                            break;
                        case 'Walking Activities':
                            icon = 'imgs/icons/water-activities.png';
                            break;
                        case 'Day Trips & Excursions':
                            icon = 'imgs/icons/day-trips.png';
                            break;
                        case 'Tours & Sightseeing':
                            icon = 'imgs/icons/bustour.png';
                            break;
                        case 'Cruises & Water Tours':
                            icon = 'imgs/icons/cruiseship.png';
                            break;
                        case 'Food & Drinks':
                            icon = 'imgs/icons/restaurant_korean.png';
                            break;
                        case 'Hop-on Hop-off':
                            icon = 'imgs/icons/restaurant_mexican.png';
                            break;
                        case "Air, Balloon & Helicopter Tours":
                            icon = 'imgs/icons/kingair.png'
                    }

                    var marker = new google.maps.Marker({
                            map: this.map,
                            position: {
                                lat: results[j].lat,
                                lng: results[j].lng
                            },
                            title: x[j].title,
                            infowindow: infoWindow,
                            icon: icon
                        })
                        // console.log(marker);
                        // console.log(x[j].categories[0]);

                    google.maps.event.addListener(marker, 'click', function() {
                        this.infowindow.open(map, this);
                    });
                    google.maps.event.addListener(marker, 'dblclick', function() {
                        this.infowindow.close(map, this);
                    });
                }

                //creates a new latlngbounds, does a for loop that transforms my results array
                //into a google.maps.LatLng whatever that is, then calls a function extend which is
                //a property of latlngbounds, passing in myLatLng as an argument.
                //Lastly it calls fitBounds property on this.latlngbounds
                this.latlngbounds = new google.maps.LatLngBounds();
                for (var z = 0; z < results.length; z++) {
                    var myLatLng = new google.maps.LatLng(results[z]);
                    this.latlngbounds.extend(myLatLng);

                }
                this.map.fitBounds(this.latlngbounds);
            }
            // map: an instance of google.maps.Map object
            // latlng: an array of google.maps.LatLng objects

        //
        // this.makeWindowInfo  = function (){
        //   var contentString = 'Hello World';
        //   this.infowindow = new google.map.infoWindow({
        //     content: contentString
        //   });
        //
        // }

    });
