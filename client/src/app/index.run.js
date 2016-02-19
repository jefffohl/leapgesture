(function() {
  'use strict';

  angular
    .module('leapgesture')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
