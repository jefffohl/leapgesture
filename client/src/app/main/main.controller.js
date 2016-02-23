(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, leapController, $resource, $log, $http) {

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

      leapController.controller = new Leap.Controller({background: true})
        .use('playback', {
          recording: '/api/gestures/20/data.lz', // this is a test
          loop: true,
          pauseHotkey: false,
          pauseOnHand: false,
          autoPlay : true
        })
        .use('riggedHand')
        .use('handEntry')
        .connect();

        /*
        if (!player.recording) {
          player.setRecording({ recording : {} });
        }
        var newRecording = JSON.parse(player.recording.decompress($scope.gestures[id].data));
        // var frames = recording.frames;
        player.setRecording({ recording: newRecording });
        console.log(player.recording);
        player.play();
        */
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

    Gesture.index(function(response) {
      console.log(response);
      angular.forEach(response, function(value){
        if (value.constructor.name === "Resource") {
          $scope.gestures.push(value);
        }
      });
    });

    /*
    $http.get("/api/gestures/20").then(function(response){
      console.log(response);
    }, function(error){
      console.error(error);
    });
    */

  }

})();
