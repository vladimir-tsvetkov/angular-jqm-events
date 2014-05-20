'use strict';

(function () {
  var jqmEvents = [
    'tap',
    'taphold',
    'swipe',
    'swiperight',
    'swipeleft',
    'vmouseover',
    'vmouseout',
    'vmousedown',
    'vmousemove',
    'vmouseup',
    'vclick',
    'vmousecancel',
    'orientationchange',
    'scrollstart',
    'scrollend',
  ];

  var event, directive, i;
  for (i=0; i<jqmEvents.length; i++) {
    event = jqmEvents[i];
    directive = 'jqm' + event.substring(0, 1).toUpperCase() + event.substring(1);
    createEventDirective(directive, event);
  }
  
  function registerEventHandler(scope, $parse, element, eventType, handler) {
    var fn = $parse(handler);
  
    element.bind(eventType, function (event) {
      scope.$apply(function() {
        fn(scope, {$event:event});
      });
    });
  }

  function createEventDirective(directive, eventType) {
    angular.module('jqmEvents').directive(directive, ['$parse', function ($parse) {
      return function (scope, element, attrs) {
        var eventHandler = attrs[directive];
        registerEventHandler(scope, $parse, element, eventType, eventHandler);
      };
    }]);
  }
})();
