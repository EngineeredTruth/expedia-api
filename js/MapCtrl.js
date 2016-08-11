angular.module('app')
  .controller('MapCtrl', function($scope, $stateParams, mapService) {

    $scope.title = $stateParams.title;
    $scope.price = $stateParams.price;
    $scope.score = $stateParams.score;
    //fixes the url string after being passed
    console.log($stateParams.thumbUrl);
    $scope.thumbUrl = $stateParams.thumbUrl.replace(/%2F/g, '/');
    console.log($scope.thumbUrl);

//splits the coords then turns them into floats
    var coords = $stateParams.latLng.split(',');
    var latX = parseFloat(coords[0]);
    var longX = parseFloat(coords[1]);

//declares map variable

//function that inities a map

    $scope.map = mapService.initMap(latX,longX);
    $scope.map = mapService.map;
});
