(function () {
  'use strict';

  angular.module('app')
    .controller('ModalInstanceCtrl', function ($scope, $http, productsService) {
      productsService.setParams($scope.product);

      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, productsService.getParams());
    });
})();
