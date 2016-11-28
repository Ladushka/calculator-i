(function () {
  'use strict';

  angular.module('app')

    .controller('productsController', function ($scope, $http, $ionicModal, productsService) {

      productsService.getProducts().then(function (response) {
        $scope.products = response.data;
        console.log($scope.products);
      });

      $ionicModal.fromTemplateUrl('js/products/moreProductDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        console.log('work');
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });

    });
})();
