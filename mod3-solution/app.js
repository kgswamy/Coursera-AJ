(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);;

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html'
  };
    return ddo;
  }

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
var menu = this;
menu.itemFilter = "";
menu.notFound = "";

menu.getMatchedItems = function(){

  if (menu.itemFilter == ""){
    menu.notFound ="Nothing Found!";
    return;
  }

  var promise = MenuSearchService.getMenuItems();

  promise.then(function (response) {

    menu.foundItems = response.data.menu_items;
    console.log(menu.foundItems.length);

    for(var i = menu.foundItems.length - 1; i >= 0; i--){
            if(menu.foundItems[i].description.toUpperCase().indexOf(menu.itemFilter.toUpperCase()) == -1){
              // console.log(i, menu.foundItems[i].description, menu.itemFilter);
              menu.foundItems.splice(i,1);
            }
        }
        console.log(menu.foundItems.length);
        if (menu.foundItems.length == 0 ){
          menu.notFound ="Nothing Found!";
          return;
        } else menu.notFound ="";


  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

};

menu.removeItem = function (itemIndex) {
  // this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    menu.foundItems.splice(itemIndex, 1);
    console.log(menu.foundItems.length);

  };

  // this.title = origTitle + " (" + list.items.length + " items )";
};


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService ($http, ApiBasePath){
  var service = this;

  service.getMenuItems = function (shortName) {
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
