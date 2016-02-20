(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, leapController, $resource) {

    var controller = leapController.controller;

    $scope.play = function() {
      controller.plugins.playback.player.play();
    };

    $scope.record = function() {
      controller.plugins.playback.player.record();
    };

    var Gestures = $resource('/api/gestures/:gestureId');

    // We can retrieve a collection from the server
    var gestures = Gestures.query(function(response) {
      console.log("response: ", response);
    });

  }

})();
