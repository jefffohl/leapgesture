(function() {
  'use strict';

  angular
    .module('leapgesture')
    .provider('leapController', leapControllerProvider);


  function leapControllerProvider() {

    var controller = new Leap.Controller({background: true})
        .use('playback', {
          recording: '/api/gestures/20/data.lz', // this is a test
          loop: false,
          pauseHotkey: false,
          pauseOnHand: false,
          autoPlay : false
        })
        .use('riggedHand')
        .connect();


    var player =  controller.plugins['playback'].player;

    this.$get = function leapController() {
      return {
        controller : controller,
        player : player
      };
    };

  }
})();
