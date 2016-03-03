(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, leapController, $resource, $log, $http) {

    $scope.view = {
      loading : false,
      currentGestureId : null,
      unsavedRecording : false
    };

    var Gesture = $resource("/api/gestures/:id", { id: "@id" },
      {
        'create':  { method: 'POST' },
        'index':   { method: 'GET', isArray: false },
        'show':    { method: 'GET', isArray: false },
        'update':  { method: 'PUT' },
        'destroy': { method: 'DELETE' }
      }
    );

    $scope.gestures = [];

    $scope.player = leapController.player;

    $scope.play = function() {
      leapController.player.play();
    };

    $scope.selectGesture = function(id) {
      $scope.view.unsavedRecording = false;
      $scope.view.loading = true;
      // get the recording from the server
      Gesture.show({id : id}, function(response){
        leapController.player.setRecording({'compressedRecording' : response.data.data});
        $scope.view.currentGestureId = response.data.id;
        $scope.view.loading = false;
        $scope.play();
      });
    };

    $scope.record = function() {
      leapController.player.record();
      leapController.controller.on('playback.recordingFinished', function(){
        $scope.view.unsavedRecording = true;
        $log.log("recording finished");
        $scope.$apply();
      });
    };

    $scope.delete = function() {
      $scope.view.loading = true;
      Gesture.destroy({id : $scope.view.currentGestureId}, function(response){
        $scope.view.loading = false;
        loadGestures();
        $log.log(response);
      });
    };

    $scope.save = function() {
      var gesture = leapController.player.recording.export('lz');
      //var gesture = "N4IgtgpgLghgJjWIBcoBmB7ATmRA1CLAZwEsMA7FAJgBoQBzCcwx";
      var newGesture = new Gesture({'data': gesture});
      newGesture.$save().then(function(response){
        $log.log("save response: ", response);
        $scope.view.unsavedRecording = false;
        loadGestures();
      });
    };

    // We can retrieve a collection from the server
    var loadGestures = function() {
      $scope.view.loading = true;
      Gesture.index(function(response) {
        $scope.gestures = response.data;
        $scope.view.loading = false;
      });
    };

    loadGestures();

    /*
    $http.get("/api/gestures/20").then(function(response){
      console.log(response);
    }, function(error){
      console.error(error);
    });
    */

  }

})();
