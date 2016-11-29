(function () {
  'use strict';

  angular.module('app')

    .controller('productsController', function ($scope, $http, $ionicModal, productsService, $uibModal) {

      productsService.getProducts().then(function (response) {
        $scope.products = response.data;

        $scope.productNames = ($scope.products).map(function (item) {
          return item.name;
        })
      });

      productsService.getCategories().then(function (response) {
        $scope.categories = (response.data).map(function (item) {
          return item.type;
        });
      });

      $scope.openModal = function (product) {
        $scope.product = product;
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'js/products/moreProductDetails.html',
          size: 'lg',
          scope: $scope
        });
        modalInstance.result.then(function () {
         // $scope.save(product);
        });


      };



    });
})();
