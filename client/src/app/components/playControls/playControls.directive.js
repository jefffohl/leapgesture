(function() {
  'use strict';

  angular
    .module('leapgesture')
    .directive('playControls', playControlsDirective);


  function playControlsDirective($log, leapController) {

    return {
      restrict : 'AE',
      replace : true,
      templateUrl : 'app/components/playControls/playControls.html',
      link : function(scope, element, attrs) {

        var progressBar = angular.element(element.find('.playhead')[0]);

        var watchers = {};

        leapController.controller.on('frame', function(){
          if (leapController.player && leapController.player.state === "playing") {
            if (scope.main.player && scope.main.player.recording) {
              var percentage = ((scope.main.player.recording.frameIndex / (scope.main.player.recording.frameCount - 1)) * 100) + "%";
              progressBar.css({"width" : percentage});
            } else {
              progressBar.css({"width" : "0%"});
            }
          }
        });

        scope.$on("$destroy", function(){
          angular.forEach(watchers, function(watcher){
            watcher();
          });
        });


      }
    };

  }

})();

