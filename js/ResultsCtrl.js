angular.module('app')
    .controller('ResultsCtrl', function($scope, promiseObj2, $stateParams, priceService, mapService, $state) {

        var x = promiseObj2;
        console.log(x);
        if (x === undefined) {
            $state.go('home', {})
            alert("Expedia doesn't have things to do at that location :'(");
        };

        for (var i = 0; i < x.length; i++) {
            x[i].fromPrice = x[i].fromPrice.substring(1);
            x[i].fromPrice = parseInt(x[i].fromPrice);
        }
        $scope.info = x;

        $scope.title = $stateParams.id;

        var minMax = priceService.getMaxMin(promiseObj2);
        $scope.priceInfo = {};
        $scope.priceInfo.min = minMax.min;
        $scope.priceInfo.max = minMax.max;

        var coords = x[0].latLng.split(',');
        var latInitial = parseFloat(coords[0]);
        var lonInitial = parseFloat(coords[1]);

        $scope.map = mapService.initMap(latInitial, lonInitial);
        mapService.makeMarkers(x);

        $scope.show = 1;

        $scope.toggleViews = function() {

            if ($scope.show === 1) {
                $scope.show = 0;
            } else if ($scope.show === 0) {
                $scope.show = 1
            }
            console.log($scope.show);
        }

    });
