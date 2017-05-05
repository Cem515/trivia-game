(function() {
  'use strict';

 angular
    .module('app')
    .factory('QuestionFactory', QuestionFactory);

 QuestionFactory.$inject = ['$http'];

 /* @ngInject */
  function QuestionFactory($http) {
    var service = {
      questionCreate: questionCreate,
      playVideo: playVideo
    };

   return service;

   function questionCreate(question) {
      return $http.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&encode=url3986")
        .then(function(response) {
          return response.data;

       });
    }

   function playVideo(video) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var player;

     function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

     function onPlayerReady(event) {
        event.target.playVideo();
      }
      
      var done = false;

     function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }

     function stopVideo() {
        player.stopVideo();
      }
    }

 }
})();