(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, leapController, $resource) {

    var player = leapController.controller.plugins.playback.player;

    var Gestures = $resource('/api/gestures/:gestureId');

    $scope.player = player;

    $scope.play = function() {
      player.play();
    };

    $scope.record = function() {
      player.record();
    };

    $scope.save = function() {
      var gesture = player.recording.export();
      var newGesture = new Gestures({'gesture': gesture});
      newGesture.$save().then(function(response){
        console.log("save response: ", response);
      });
    };

    // We can retrieve a collection from the server
    var gestures = Gestures.query(function(response) {
      console.log("response: ", response);
    });

  }

})();
