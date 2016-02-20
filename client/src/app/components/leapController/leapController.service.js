(function() {
  'use strict';

  angular
    .module('leapgesture')
    .factory('leapController', leapController);


  function leapController() {
    /*
    var controller = Leap.loop({})
    .use('playback', {
      //recording: 'recorder/recordings/pinch-57fps.json.lz',
      requiredProtocolVersion: 6,
      pauseOnHand: true,
      loop: true
    })
    .use('riggedHand');

    */
    var service = {
      //controller : controller
    };

    return service;

  }
})();
