(function() {
  'use strict';

  angular
    .module('leapgesture')
    .provider('leapController', leapControllerProvider);


  function leapControllerProvider() {

    var controller = new Leap.Controller({background: true})
        .use('playback', {
          loop: false,
          pauseHotkey: false,
          pauseOnHand: false
        })
        .use('riggedHand')
        .use('handEntry')
        .connect();

    this.$get = function leapController() {
      return {
        controller : controller
      };
    };
  }
})();
