(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, leapController, $resource, $log) {

    var player = leapController.controller.plugins.playback.player;

    var Gesture = $resource("/api/gestures/:id", { id: "@id" },
      {
        'create':  { method: 'POST' },
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: false },
        'update':  { method: 'PUT' },
        'destroy': { method: 'DELETE' }
      }
    );

    $scope.gestures = [];

    $scope.player = player;

    $scope.play = function(id) {
      if (!player.recording) {
        player.setRecording({ recording : {} });
      }
      player.setRecording({recording : player.recording.decompress($scope.gestures[id].data)});
      console.log(player.recording);
      player.play();
    };

    $scope.record = function() {
      player.record();
    };

    $scope.save = function() {
      var gesture = player.recording.export('lz');
      //var gesture = "N4IgtgpgLghgJjWIBcoBmB7ATmRA1CLAZwEsMA7FAJgBoQBzCcwx";
      var newGesture = new Gesture({'data': gesture});
      newGesture.$save().then(function(response){
        $log.log("save response: ", response);
      });
    };

    // We can retrieve a collection from the server
    Gesture.query(function(response) {
      angular.forEach(response, function(value){
        if (value.constructor.name === "Resource") {
          $scope.gestures.push(value);
        }
      });
      console.log($scope.gestures);
    });

  }

})();
