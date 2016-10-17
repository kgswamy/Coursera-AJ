(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var toBuyControl = this;

  toBuyControl.toBuyItems = ShoppingListCheckOffService.getBuyItems();

  toBuyControl.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
 }

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();

  boughtList.removeItem = function () {
     ShoppingListCheckOffService.addBoughtItem(itemAdder.itemName, itemAdder.itemQuantity);
  }

}

function ShoppingListCheckOffService() {
  var service = this;
  // List of shopping items
  var toBuyItems = [];
  var boughtItems = [];

  //initialize items;
  toBuyItems =  [ {name: "Cookies", quantity: "10"},
                  {name: "Coke", quantity: "12"},
                  {name: "Brownees",quantity: "24"},
                  {name: "Chips", quantity: "4"},
                  {name: "Bread", quantity: "6"}];

    service.buyItem = function (itemIdex) {
    console.log ("in side remove function");
    var item = {
      name: toBuyItems[itemIdex].name,
      quantity: toBuyItems[itemIdex].quantity
    };
    boughtItems.push(item);

    toBuyItems.splice(itemIdex, 1);
  };

  // service.addBoughtItem = function (itemName, quantity) {
  //   var item = {
  //     name: itemName,
  //     quantity: quantity
  //   };
  //   boughtItems.push(item);
  // };

  service.getBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

}


})();
