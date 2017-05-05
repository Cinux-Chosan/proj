define('liquid-fire/ember-internals/version-specific/index', ['exports', 'liquid-fire/templates/version-specific/get-outlet-state', 'ember'], function (exports, _getOutletState, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getOutletStateTemplate = undefined;
  exports.initialize = initialize;
  exports.containingElement = containingElement;
  Object.defineProperty(exports, 'getOutletStateTemplate', {
    enumerable: true,
    get: function () {
      return _getOutletState.default;
    }
  });
  var getViewBounds = _ember.default.ViewUtils.getViewBounds;
  function initialize() {}

  function containingElement(view) {
    return getViewBounds(view).parentElement;
  }
});