(function () {
  'use strict';

  angular
    .module('app')
    .factory('QuestionFactory', QuestionFactory);

  QuestionFactory.$inject = ['$http'];

  /* @ngInject */
  function QuestionFactory($http) {
    var service = {
      questionCreate: questionCreate,
      randomBeer: randomBeer
    };

    return service;

    function questionCreate(question) {
      return $http.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&encode=url3986")
        .then(function (response) {
          return response.data;

        });
    }

    function randomBeer(beer) {
      return $http.get("http://api.brewerydb.com/v2/beer/random?key=cf772398dc53cc03dcd9241d3d9b3cff&format=json")
        .then(function (response) {
          return response.data

        })

    }

  }
})();