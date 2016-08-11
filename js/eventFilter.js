angular.module('app')
  .filter('eventFilter', function(){

    return function(listings, priceInfo) {

      var filtered = [];

      var min = priceInfo.min;
      var max = priceInfo.max;

      angular.forEach(listings, function(listing){
        if(listing.fromPrice >= min && listing.fromPrice <= max){
          filtered.push(listing);
        }
      });
        return filtered;
    };

  });
