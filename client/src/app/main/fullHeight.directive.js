(function() {
  'use strict';

  angular
    .module('leapgesture')
    .directive('fullHeight', fullHeight);

  /** @ngInject */
  function fullHeight() {

    return {
      restrict: 'A',
      scope: false,
      link: function(scope, element, attrs) {

        // get height of window

        // set height of element to height of window

      }
    };

  }
})();
