(function () {
  'use strict';

  angular.module('app')

    .controller('productsController', function ($scope, $http, $ionicModal, productsService, $uibModal) {

      $ionicModal.fromTemplateUrl('js/products/productEdit.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal2 = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      productsService.getProducts().then(function (response) {
        $scope.products = response.data;

        $scope.productNames = ($scope.products).map(function (item) {
          return item.name;
        })
      });

      productsService.getCategories().then(function (response) {
        $scope.categories = response.data;
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

      $scope.find = function (category) {
        $scope.idCategory = ($scope.categories).filter(function (item) {
          if (item.name == category) {
            return item;
          }
        })[0];

        (productsService.getCategory($scope.idCategory.id)).then(function (response) {
          $scope.products = (response.data).map(function (item) {
            return item;
          });

        });

      }


    });
})();
