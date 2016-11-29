(function () {
  'use strict';

  angular.module('app')

    .service('productsService',function ($http) {
      var _product;
      return{
        getProducts:function () {
          return $http.get('json/products.json');
        },
        setParams:function (product) {
          _product=product;
        },
        getParams:function () {
          return {
            type: 'doughnut',
            data: {
              labels: ['Fats','Proteins','Carbohydrates'],
              datasets: [{
                data: [_product.fats, _product.proteins, _product.carbohydrates],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              beginAtZero:true
            }
          };
        },
        getCategories:function () {
          return $http.get('json/categories.json');
        }
      };

    });
})();
