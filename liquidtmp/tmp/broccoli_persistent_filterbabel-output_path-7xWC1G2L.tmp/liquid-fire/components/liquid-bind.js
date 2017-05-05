define('liquid-fire/components/liquid-bind', ['exports', 'ember', 'liquid-fire/templates/components/liquid-bind'], function (exports, _ember, _liquidBind) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var LiquidBind = _ember.default.Component.extend({
    layout: _liquidBind.default,
    tagName: '',
    positionalParams: ['value'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
    forwardMatchContext: _ember.default.computed('matchContext', function () {
      var m = this.get('matchContext');
      if (!m) {
        m = {};
      }
      if (!m.helperName) {
        m.helperName = 'liquid-bind';
      }
      return m;
    })
  });

  LiquidBind.reopenClass({
    positionalParams: ['value']
  });

  exports.default = LiquidBind;
});