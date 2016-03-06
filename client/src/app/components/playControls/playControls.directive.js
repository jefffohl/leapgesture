(function() {
  'use strict';
  angular
    .module('leapgesture')
    .directive('playControls', playControlsDirective);
  function playControlsDirective($log, leapController) {
    return {
      restrict : 'E',
      replace : true,
      templateUrl : 'app/components/playControls/playControls.html',
      link : function(scope, element, attrs) {

      }
    };
  }
})();


(function() {
  'use strict';
  angular
    .module('leapgesture')
    .directive('recording', recordingDirective);
  function recordingDirective(leapController, $document) {
    return {
      restrict : 'E',
      replace : false,
      link : function(scope, element, attrs) {
        var clientXMin = 0;
        var clientXMax = 0;
        element.on('mousedown', function(mouseDownEvent){
          clientXMin = element.offset().left;
          clientXMax = element.width() + clientXMin;
          setNewFrameIndex(mouseDownEvent);
          $document.on('mousemove', function(mouseMoveEvent){
            setNewFrameIndex(mouseMoveEvent);
          });
        });
        $document.on('mouseup', function(){
          $document.off('mousemove');
        });

        function setNewFrameIndex(event) {
          if (leapController.player && leapController.player.recording && (event.clientX > clientXMin) && (event.clientX < clientXMax) ) {
            var percentage = event.offsetX / element.width();
            var newFrameIndex = Math.floor(leapController.player.recording.frameCount * percentage);
            leapController.player.setFrameIndex(newFrameIndex);
          }
        }
      }
    };
  }
})();

(function() {
  'use strict';
  angular
    .module('leapgesture')
    .directive('playhead', playheadDirective);
  function playheadDirective(leapController) {
    return {
      restrict : 'E',
      replace : false,
      link : function(scope, element, attrs) {
        leapController.controller.on('frame', setPlayhead);
        function setPlayhead() {
          if (leapController.player) {
            if (scope.main.player && scope.main.player.recording) {
              var percentage = ((scope.main.player.recording.frameIndex / (scope.main.player.recording.frameCount - 1)) * 100) + "%";
              element.css({"width" : percentage});
            } else {
              element.css({"width" : "0%"});
            }
          }
        }
      }
    };
  }
})();

