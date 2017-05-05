define('liquid-fire/mixins/pausable', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Mixin.create({
    _transitionMap: _ember.default.inject.service('liquid-fire-transitions'),

    _initializeLiquidFirePauseable: _ember.default.on('init', function () {
      this._lfDefer = [];
    }),
    pauseLiquidFire: function pauseLiquidFire() {
      var context = this.nearestWithProperty('_isLiquidChild');
      if (context) {
        var defer = new _ember.default.RSVP.defer();
        var tmap = this.get('_transitionMap');
        tmap.incrementRunningTransitions();
        defer.promise.finally(function () {
          return tmap.decrementRunningTransitions();
        });
        this._lfDefer.push(defer);
        context._waitForMe(defer.promise);
      }
    },

    resumeLiquidFire: _ember.default.on('willDestroyElement', function () {
      var defer = this._lfDefer.pop();
      if (defer) {
        defer.resolve();
      }
    })
  });
});