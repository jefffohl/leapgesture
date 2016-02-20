(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, leapController) {

    var controller = leapController.controller;

    $scope.play = function() {
      controller.plugins.playback.player.play();
    };

    $scope.record = function() {
      controller.plugins.playback.player.record();
    };

  }

})();
