(function () {
  'use strict';

  angular.module('app')

    .service('productsService',function ($http) {
      return{
        getProducts:function () {
          return $http.get('http://localhost:8080/products');
        }
      }

    });
})();
