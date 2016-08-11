angular.module('app')
    .directive('filterD', function() {
        return {
            restrict: 'E',
            templateUrl: '../templates/filter-d.html',
            controller: function($scope) {
                $scope.x = 'x';
            }

        };
    })
    .directive('homeBar', function() {
        return {
            restrict: 'E',
            templateUrl: '../templates/home-bar.html',
            link: function(scope, element, attribute) {
                $('.home-bar').click(function() {
                    console.log('Butters');
                    $('.results-header').show();
                    $('#butters').attr('src', 'imgs/Butters.JPG');
                    $('.results-header').css('background', 'URL("../imgs/Butters.JPG")');
                    $('.results-header').css('background-size', 'cover');
                    $('.results-title').text('');
                    $('.white-line').hide();
                    $('.results-header').css('background-position', 'center center');
                    $('#player').css('display', 'none');
                    player.pauseVideo();
                })

                $('.home-bar').dblclick(function() {
                    console.log('Butters');
                    $('#player').css('display', 'initial');
                    $('.results-header').hide();
                    player.playVideo();
                })
            }
        }
    })
