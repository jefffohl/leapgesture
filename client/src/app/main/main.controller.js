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


    vm.play = function() {
      leapController.player.play();
    };

    vm.selectGesture = function(id) {
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
