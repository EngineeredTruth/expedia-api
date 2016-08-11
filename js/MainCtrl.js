angular.module('app').controller('MainCtrl', function($scope, apiService, $state, $stateParams) {
            //makes a prototype function that allows me to add days to a date
            Date.prototype.addDays = function(days) {
                    var dat = new Date(this.valueOf());
                    dat.setDate(dat.getDate() + days);
                    return dat;
                }
                //initializes our search bar
            $scope.userSearch = "Let's go somewhere";

            //this set of code creates a start and end date then formats it appropriately for the API call
            var startDay = new Date();
            var endDay = new Date();
            endDay = endDay.addDays(14);

            startDay = startDay.toISOString().substring(0, 10);
            endDay = endDay.toISOString().substring(0, 10);

            //activates the search with ng-submit and passes in the stateParams
            $scope.search = function() {
                if ($scope.userSearch == '' || $scope.userSearch == "Let's go somewhere" || $scope.userSearch == 'Enter a location here') {
                    $scope.userSearch = 'Enter a location here';
                }
                else {
                    $state.go('results', {
                            id: $scope.userSearch,
                            startDate: startDay,
                            endDate: endDay
                        });
                    }
                }

                //used to clear the search bar when user clicks on it
                $scope.clear = function() {
                    $scope.userSearch = '';
                }

                //used to clear the search bar when user types, and only works onece
                var count = 0;

                $scope.clearKeydown = function() {

                    if (count === 0) {
                        $scope.userSearch = '';
                    }
                    count++;
                }

            });
