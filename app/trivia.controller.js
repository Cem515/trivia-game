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
    // triviaCtrl.results.question = "";
    // triviaCtrl.results.correct_answer = "";
    

    triviaCtrl.next = function () {
      if (triviaCtrl.currentIndex === triviaCtrl.results.length) {
        triviaCtrl.currentIndex = 0;
      } else {
        triviaCtrl.currentIndex++;
      }
    }
    triviaCtrl.back = function () {
      if (triviaCtrl.currentIndex === triviaCtrl.results.length) {
        triviaCtrl.currentIndex = 0
      } else {
        triviaCtrl.currentIndex--;
      }
    }


    triviaCtrl.retrieve = function () {
        QuestionFactory
          .questionCreate()
          .then(function (data) {
            triviaCtrl.results = data.results;
      });
    }
triviaCtrl.questionPop= function () {
         
      triviaCtrl.currentQuestion = {
        question: decodeURIComponent(triviaCtrl.results[triviaCtrl.currentIndex].question),
        CorrectAnswer: triviaCtrl.results[triviaCtrl.currentIndex].correct_answer
      };


          };

      }

})();