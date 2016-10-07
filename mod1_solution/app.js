(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', MyFirstController) ;
  MyFirstController.$inject = ['$scope'];
  function MyFirstController ($scope) {
    $scope.stringtosplit="";
    $scope.howMuch="";

  $scope.CalculateHowMuch = function(){
    var instring=$scope.stringtosplit;
    // var Arrayofwords = string.split(',');
    var Arrayofwords=instring.split(',');
    if (Arrayofwords[0] == "") {
      $scope.howMuch="Please enter data first"
    } else if (Arrayofwords.length > 3 ) {
      $scope.howMuch="Too Much!"
    } else {
      $scope.howMuch="Enjoy!"
    }

  };

};

})();
