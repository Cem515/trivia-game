(function () {
  'use strict';

  angular
    .module('app')
    .controller('TriviaController', TriviaController);

  TriviaController.$inject = ['QuestionFactory'];

  /* @ngInject */
  function TriviaController(QuestionFactory) {
    var triviaCtrl = this;
    triviaCtrl.questionList = [];
    triviaCtrl.youtubeID = "";
    triviaCtrl.results = [];
    triviaCtrl.currentIndex = 0;
    triviaCtrl.beerResults = [];

    //Next and Back Buttons

    triviaCtrl.next = function () {
      triviaCtrl.show = false;
      if (triviaCtrl.currentIndex === triviaCtrl.results.length) {
        triviaCtrl.currentIndex = 0;
      } else {
        triviaCtrl.currentIndex++;
      }
    };

    triviaCtrl.back = function () {
      triviaCtrl.show = false;
      if (triviaCtrl.currentIndex === triviaCtrl.results.length) {
        triviaCtrl.currentIndex = 0
      } else {
        triviaCtrl.currentIndex--;
      }
    };

    //Retrieve Questions from Database

    triviaCtrl.retrieve = function () {
      QuestionFactory

        .questionCreate()
        .then(function (data) {
          triviaCtrl.results = data.results;
        });
      triviaCtrl.show = false;
    }

    //Populate Questions
    triviaCtrl.questionPop = function () {

      triviaCtrl.currentQuestion = {
        question: decodeURIComponent(triviaCtrl.results[triviaCtrl.currentIndex].question),

      }

      triviaCtrl.answers = {

        CorrectAnswer: decodeURIComponent(triviaCtrl.results[triviaCtrl.currentIndex].correct_answer),
        IncorrectAnswer: decodeURIComponent(triviaCtrl.results[triviaCtrl.currentIndex].incorrect_answers)
      }


    };
    //Gets Random Beer Information
    triviaCtrl.beerInfo = function () {
      QuestionFactory
        .randomBeer()
        .then(function (data) {
          triviaCtrl.beerResults = data;
        });

      //Populate Beer Information

      triviaCtrl.beerPop = function () {
        triviaCtrl.beer = {
          name: triviaCtrl.beerResults.nameDisplay,
          abv: triviaCtrl.beerResults.abv,
          style: triviaCtrl.beerResults.shortName,
          description: triviaCtrl.beerResults.description,
          label: triviaCtrl.beerResults.labels.large,
        }

      }
    };

  }

})();