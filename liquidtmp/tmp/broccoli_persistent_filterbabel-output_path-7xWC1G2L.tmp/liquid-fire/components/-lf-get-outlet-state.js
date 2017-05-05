define('liquid-fire/components/-lf-get-outlet-state', ['exports', 'ember', 'liquid-fire/ember-internals'], function (exports, _ember, _emberInternals) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend({
    tagName: '',
    layout: _emberInternals.getOutletStateTemplate
  });
});