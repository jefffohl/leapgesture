(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, leapController, $resource, $log) {

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
      //var gesture = player.recording.export();
      var gesture = "foo";
      var newGesture = new Gestures({'data': gesture});
      newGesture.$save().then(function(response){
        $log.log("save response: ", response);
      });
    };

    // We can retrieve a collection from the server
    Gestures.query(function(response) {
      $log.log("response: ", response);
    });

  }

})();
