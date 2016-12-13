(function () {
  'use strict';

  angular.module('app')

    .controller('productsController', function ($scope, $http, $uibModal, $ionicModal, productsService) {

      $ionicModal.fromTemplateUrl('js/products/productEdit.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal2 = function () {
        $scope.modal.show();
        console.log(document.getElementsByTagName('input')[0].value);
        if(document.getElementsByTagName('input')[0].value==""){
          document.getElementsByTagName('input')[1].disabled = false;
        }else{
          document.getElementsByTagName('input')[1].disabled = true;
        }
      };
      $scope.closeModal = function () {
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
      };

      $scope.addProduct = function (newProduct) {
        console.log(document.getElementsByTagName('input'));


          newProduct.category = $scope.idCategory;
          newProduct.id = 0;

          productsService.addProduct(newProduct);
          for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
            document.getElementsByTagName('input')[i].value = '';
          }

          $scope.closeModal();

      };

      $ionicModal.fromTemplateUrl('js/products/categoryEdit.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal2) {
        $scope.modal2 = modal2;
      });
      $scope.openModal3 = function () {
        $scope.modal2.show();
      };
      $scope.closeModal2 = function () {
        $scope.modal2.hide();
      };
      $scope.addCategory = function (newCategory) {
        newCategory.id = 0;
        document.getElementsByTagName('input')[1].value = '';
        $scope.closeModal2();
      };

      $scope.delete=function (product) {
        productsService.deleteProduct(product.id);
        location.reload();
      };


    });
})();
