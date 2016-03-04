(function() {
  'use strict';

  angular
    .module('leapgesture')
    .controller('SaveRecordingModalController', SaveRecordingModalController);

  /** @ngInject */
  function SaveRecordingModalController($scope, $uibModalInstance) {

    $scope.gestureName = "My Gesture";

    $scope.save = function() {
      $scope.$close($scope.gestureName);
    }

    $scope.cancel = function() {
      $scope.$dismiss("Dismissed");
    }

  }
})();
