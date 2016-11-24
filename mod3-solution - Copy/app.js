(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);;


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      items: '<',
      myTitle: '@title',
      badRemove: '=',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

    return ddo;
  }


  function FoundItemsDirectiveController() {
    var list = this;

    list.cookiesInList = function () {
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }

      return false;
    };
  }


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
var menu = this;

var promise = MenuSearchService.getMatchedMenuItems();

promise.then(function (response) {
  menu.foundList = response.data;
  console.log(menu.foundList.menu_items);
})
.catch(function (error) {
  console.log("Something went terribly wrong.");
});

}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService ($http, ApiBasePath){
  var service = this;
  service.getMatchedMenuItems = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

};


})();
