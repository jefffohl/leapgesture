(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, leapController, $resource, $uibModal, $log) {

    var vm = this;

    vm.view = {
      loading : false,
      currentGestureId : null,
      recordedGesture : {
        name : "My Gesture"
      },
      playing : false,
      recording : false,
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

    vm.gestures = [];

    vm.player = leapController.player;

    leapController.controller.on('playback.recordingFinished', function(){
      vm.view.recording = false;
      //vm.view.unsavedRecording = true;
      //$scope.$apply();
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/main/saveRecordingModal.html',
        controller: 'SaveRecordingModalController',
        controllerAs: 'modal',
        size: 'sm'
      });

      modalInstance.result.then(function (name) {
        vm.view.recordedGesture.name = name;
        vm.save();
      });
    });

    leapController.controller.on('playback.playbackFinished', function(){
      vm.view.playing = false;
      $scope.$apply();
    });

    vm.toggle = function() {
      vm.view.playing = !vm.view.playing;
      vm.player.toggle();
    };

    vm.play = function() {
      vm.view.playing = true;
      leapController.player.play();
    };

    vm.pause = function() {
      vm.view.playing = false;
      leapController.player.pause();
    };

    vm.clear = function() {
      leapController.player.stop();
      vm.view.playing = false;
    };

    vm.selectGesture = function(id) {
      if (id === vm.view.currentGestureId) {
        vm.view.currentGestureId = null;
        if (vm.player.playing) {
          vm.player.stop();
        }
        vm.view.playing = false;
        vm.clear();
        return;
      }
      vm.view.unsavedRecording = false;
      vm.view.loading = true;
      // get the recording from the server
      Gesture.show({id : id}, function(response){
        leapController.player.setRecording({'compressedRecording' : response.data.data});
        vm.view.currentGestureId = response.data.id;
        vm.view.loading = false;
        vm.play();
      });
    };

    vm.record = function() {
      if (vm.view.recording) {
        vm.view.recording = false;
        vm.player.pause();
        vm.player.stop();
        vm.player.clear();
        return;
      }
      vm.view.currentGestureId = null;
      vm.view.recording = true;
      leapController.player.record();
    };

    vm.delete = function() {
      vm.view.loading = true;
      Gesture.destroy({id : vm.view.currentGestureId}, function(){
        vm.view.loading = false;
        loadGestures();
      });
    };

    vm.save = function() {
      var gesture = leapController.player.recording.export('lz');
      var newGesture = new Gesture({'data': gesture, 'name' : vm.view.recordedGesture.name});
      newGesture.$save().then(function(){
        vm.view.unsavedRecording = false;
        loadGestures();
      });
    };

    // We can retrieve a collection from the server
    var loadGestures = function() {
      vm.view.loading = true;
      Gesture.index(function(response) {
        vm.gestures = response.data;
        vm.view.loading = false;
      });
    };

    loadGestures();

  }

})();
