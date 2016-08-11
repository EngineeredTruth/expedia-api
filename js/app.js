angular.module('app', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/:error',
                templateUrl: '../views/homeTmpl.html',
                controller: 'MainCtrl'
            })
            .state('results', {
                url: '/results/:id?startDate?endDate',
                templateUrl: '../views/results.html',
                controller: "ResultsCtrl",
                resolve: {
                    promiseObj2: ["$http", "$stateParams", function($http, $stateParams) {
                        return $http({
                                method: 'GET',
                                url: 'http://terminal2.expedia.com:80/x/activities/search?location='+$stateParams.id+'&startDate='+$stateParams.startDate+'&endDate=' +$stateParams.endDate,
                                headers: {'Authorization': "expedia-apikey key=Gs5f57HizzNlsmMnjcBsZycviUmvHvJP" }
                            })
                            .then(function(response) {

                                return response.data.activities;
                            });
                    }]
                }
            })
            .state('map', {
              url: '/map/:latLng?title?price?score?thumbUrl',
              templateUrl: "../views/map.html",
              controller:'MapCtrl'
            });

        $urlRouterProvider.otherwise('/');

    });
